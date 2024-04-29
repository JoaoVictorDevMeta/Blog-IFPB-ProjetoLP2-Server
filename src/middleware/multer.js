import multer from "multer";
import path from "path";

// essa é a configuracao do multer
// pode ser utilizado em outros projetos
// ele armazena os arquivos em memoria, para que haja uma manipulação
// verifica se o arquivo é uma imagem

export const uploadMultiple = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).fields([{ name: 'image', maxCount: 15 }]);

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000 },
    fileFilter: async function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single("image");

// // Check file Type
function checkFileType(file, cb) {

  // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Images Only !!!");
    }
}