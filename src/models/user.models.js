import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; // to create and verify token
import bcrypt from "bcrypt"; // to hash the password before saving it to db

const userSchema = new Schema(
    {
        username: {        //i need for routes
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // to make it faster for searching
        },
        email: {           //i need for routes  
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
        },
        fullName: {        //i need for routes
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url   //i need for routes
            trim: true,
            required: true,
        },
        coverImage: {     //i need for routes
            type: String,
        },
        watchHistory: [   // i don't need it adding by programatically
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {      //i need for routes
            type: String,
            required: [true, "password is required"]
        },
        refreshToken: {      // i don't need it adding by programatically
            type: String, // for email verification and password reset
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
}


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    );
}


export const User = mongoose.model("User", userSchema)