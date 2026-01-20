const multer = require("multer");

const storage = multer.memoryStorage({
    filename:(req,file,cb ) =>{
        cb(null,Date.now() + "-" + file.originalname);
    }
});

const fileFilter =(req,file ,cb)=>{
    if(file.mimetype.startsWith("images")){
        cb(null,true)
    }else{
        cb (new Error("only images are allowed"))
    }
};

const upload = multer ({
    storage,
    fileFilter
});
module.exports=upload;