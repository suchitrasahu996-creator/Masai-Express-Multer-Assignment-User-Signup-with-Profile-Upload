const fs = require ("fs");
const cloudinary = require("../config/cloudinary.config");
const upload = require ("../middlewares/upload.middleware");
const  uniqueEmail = require("../middlewares/uniqueEmail.middleware");



const _route = express.Router();
_route.post("/signup",upload.single("profilepicture"))

const signup =async(req,res) =>{
    try{
        const {name,email}= req.body;
        if(!req.file){
            return res.status(400).json({
                message:"profile picture is required"
            })
        }
        const result = await cloudinary.uploader.upload(req.file,{
            folder:"profile pictures"
        });
        fs.unlinkSync(req.file.path);
        res.status(201).json({
            message:"user registered successfully",
            user:{
                id,
                name,
                email,
                profilePicture
            }
        })
    }
    catch(error){
        res.status(500).json({
            message:"signup failed",
        });
    }

}
module.exports = signup;