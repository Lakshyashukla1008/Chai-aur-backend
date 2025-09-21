import { v2 as cloudinary } from "cloudinary"
import fs from "fs" //file system

// when a file delete then it will be say as unlink in nodejs


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //uplode the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
            //file has been uploded 

        })
        console.log("file is uploaded on cloudinary", response.url);
        return response;
    }
    catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file if upload fails
        return null;
    }
}

export { uploadOnCloudinary }