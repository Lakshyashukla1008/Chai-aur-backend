import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, fullName, passward } = req.body
    console.log("email :", email);

    if ([fullName, username, email, passward].some((feild) => feild?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    }

    const existsUser = await User.findOne({
        $or: [{ email }, { username }]
    })


    if (existsUser) {
        throw new ApiError(409, "User already exists with this email or username")
    }

    const avatarLocalPath = req.feild?.avater[0]?.path;
    const coverImageLocalPath = req.feild?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avater is required");
    }
 
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatarLocalPath) {
        throw new ApiError(500, "Could not uplode avater try again later")
    }

    const user = await User.create({
        fullName,
        avater: avatar.url,
        coverImage: coverImage?.url || "", //if cover image is not uploded then it will be empty string
        email,
        username: username.toLowerCase(),
        passward
    })

    const createdUser = await User.findById(user._id).select(
        "-passward -refereshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Could not create user try again later")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    )
})

export { registerUser }







//     // get user details from frontend
//     // validation - not empty
//     // chack if user is already exists
//     //____ it chack by email is unque or not
//     //____ it chack by username is ubique or not
//     // chack for images and avatar
//     //____ because it's required in routes
//     // uplode them to cloudinary
//     // create user object - create entry i db
//     //  remove passward and refresh token field fro response
//     // chack for user creation then return null else return error

// if (username === ""){
//     throw new ApiError(400, "fullname is required") this is biggner friendly method
// }