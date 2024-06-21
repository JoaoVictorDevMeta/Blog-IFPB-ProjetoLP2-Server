import express from "express";
import { db } from "../lib/db.js";

const router = express.Router();

// Rota para buscar posts
// o sistema de busca ainda é muito inicial, pode sofrer mudanças
// ele utiliza tanto da busca por titulo, quanto por subtitulo
// alem da filtragem por categoria
// lembrando que as categorias são limitadas
router.get('/', async (req, res, next) => {
    const { search, category } = req.query;
    const page = Number(req.query.page) || 1; // pagina atual
    const pageSize = Number(req.query.pageSize) || 7; // numero de itens por pagina

    try {
        const whereClause = {};
        
        whereClause.OR = [
            {
                title: { contains: search, mode: 'insensitive' },
            },
            {
                subTitle: { contains: search, mode: 'insensitive' },
            }
        ];
        
        if (category) {
            whereClause.categories = {
                some: {
                    name: { equals: category }
                }
            };
        }

        const totalItems = await db.blog.count({ where: whereClause });
        const totalPages = Math.ceil(totalItems / pageSize);

        const result = await db.blog.findMany({
            where: whereClause,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            skip: (page - 1) * pageSize, // proximos itens
            take: pageSize, // itens por pagina
        });

        const response = {
            length: result.length,
            totalPages: totalPages,
            data: result
        };

        return res.send(response);
    } catch (e) {
        console.log(e);
        next(e);
    }
})

export default router;