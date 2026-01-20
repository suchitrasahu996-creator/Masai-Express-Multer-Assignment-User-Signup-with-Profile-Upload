const fs = require("fs");
const cloudinary = require("../config/cloudinary.config");
const upload = require("../middlewares/upload.middleware");
const uniqueEmail = require("../middlewares/uniqueEmail.middleware");

const _route = express.Router();
_route.post("/signup", upload.single("profilepicture"));

const signup = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "profile picture is required",
      });
    }
    const result = await cloudinary.uploader.upload(req.file, {
      folder: "profile pictures",
    });
    fs.unlinkSync(req.file.path);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: "auto-generated-id",
        name: "User Name",
        email: "user@email.com",
        profilePic: "cloudinary_image_url",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "signup failed",
    });
  }
};
module.exports = signup;
