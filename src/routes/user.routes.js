import { Router } from "express"
import { registerUser } from "../controllers/user.controllers.js"

import {upload  } from "../middlewares/multer.middlewares.js"

const router = Router()

router.route("/register").post(
    upload .fields([  //this field alwaes taken a array
        {
            name : "avater",  //the name of this object are same in frontend or backend
            maxCount : 1    
        },
        {
            name : "coverImage",
            maxcount: 1
        } // this method are called as middleware injuct 
    ]),
    registerUser)

export default router