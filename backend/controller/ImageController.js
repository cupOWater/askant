const path = require('path');
const fs = require('fs');
const {v1: uuidv1} = require('uuid');
const mainDir = path.join(__dirname, "../images")

class ImageController {
    
    async getImage(req, res){
        const fileName = req.params.fileName;
        const fileDir = path.join(mainDir, fileName);
        return res.sendFile(fileDir);
    }

    async uploadImage(req, res){
        const tempPath = req.file.path;
        const fileName = uuidv1() + path.extname(req.file.originalname);
        const targetPath = path.join(mainDir, fileName);

        fs.rename(tempPath, targetPath, err => {
            if(err){
                return res.status(500).send("Something went wrong");
            }else {
                return res.status(200).send({url: `http://localhost:2222/image/${fileName}`});
            }
        })
    }
}

module.exports = new ImageController();