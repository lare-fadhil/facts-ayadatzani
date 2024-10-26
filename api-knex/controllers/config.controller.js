
        
const Config = require('../models/config.model')
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        const dir = path.join(__dirname, '../static/uploads/')
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, path.join(__dirname, '../static/uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, req.body.table_name + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});

const uploadImage = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == 'image/svg+xml' || file.mimetype == 'image/gif' || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).single('file')


class ConfigController {
    updateImage = () => {
        return (req, res, next) => {
            uploadImage(req, res, async (err) => {
                if (err) {             
                    if (err.name === 'ExtensionError') {
                        res.status(400).json({
                            message: err.message
                        })
                    } else if (err.name === 'MulterError') {
                        res.status(400).json({
                            message: err.message
                        })
                    } else {
                        res.status(400).json({
                            message: err.message
                        })
                    }
                } else {
                    if (req.file) {
                        req.body.file = req.file.filename;
                    }
                    const data = req.body
                    if (!data.table_name) {
                        res.status(400).json({
                            message: 'table_name is required'
                        })
                    }
                    if (!data.column_name) {
                        res.status(400).json({
                            message: 'column_name is required'
                        })
                    }
                    if (!data.table_key) {
                        res.status(400).json({
                            message: 'table_key is required'
                        })
                    }
                    if (!data.table_key_value) {
                        res.status(400).json({
                            message: 'table_key_value is required'
                        })
                    }
                    if (!data.file) {
                        res.status(400).json({
                            message: 'file is required'
                        })
                    }
                    Config.updateImage(
                        data.table_name,
                        data.column_name,
                        data.table_key,
                        data.table_key_value,
                        data.file
                    ).then(data => {
                        res.status(200).json({
                            new_data: data
                        })
                    }).catch(err => {
                        res.status(400).json(err)
                    })
                }
            })
        }
    }
    
}
module.exports = new ConfigController()
        