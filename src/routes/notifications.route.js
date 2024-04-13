import express from 'express'
import { db } from '../lib/db.js';

const router = express.Router();

router.get('/all', (req, res) => {
    const notifications = db.notification.findMany();
    res.json(notifications)
});

router.put('notifications/:id', (req, res)=>{
    const notifications = db.notification.update({
        where: {
            id: Number(req.params.id)
        },
        read: true
    });
});

export default router;