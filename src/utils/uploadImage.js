import { upload, uploadMultiple } from '../middleware/multer.js';
import cloudinary from '../config/cloudinary.js';
import { promisify } from 'util';

// Convertendo para promessa
export const uploadAsync = promisify(cloudinary.uploader.upload);

// para apenas um arquivo
// enviando para serviço cloud
export const uploadImage = [
    upload, // configuração nova do multer
    async (req, res, next) => {
        try {
            // Passando da Memória (buffer) para a URL
            const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

            // Transferindo dados para o cloud
            const result = await uploadAsync(dataUrl, { resource_type: "auto" });
            req.imageUrl = result.url;
            next();
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
];

// mesmo esquema do de cima, porem para varios arquivos
export const uploadImages = [
    uploadMultiple,
    async (req, res, next) => {
        if (!req.files) return res.status(400).send('Dados inválidos');

        try {
            const files = req.files['image'];

            if(!files) return next()

            const urls = await Promise.all(files.map(async file => {
                if (file) {
                    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
                    const result = await uploadAsync(dataUrl, { resource_type: "auto" });
                    return result.url;
                }
                return null;
            }));

            req.imageUrls = urls;

            next();
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
];