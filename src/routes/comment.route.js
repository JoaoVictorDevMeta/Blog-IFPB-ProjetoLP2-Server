import express from "express";

const router = express.Router();

router.get('/', (req ,res) => {
    res.send('acessando comentario')
})

export default router;