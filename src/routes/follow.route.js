import express from 'express';
import { db } from '../lib/db.js';

const router = express.Router();

router.get('/youfl/:profile_id/all', async (req, res, next) => {
    const profile_id = Number(req.params.profile_id);

    try{
        const follow = await db.follow.findMany({
            where: {
                followerId: profile_id
            },
            include: {
                following: true // include the following User records
            }
        })

        res.send(follow)
    }catch(e){
        console.log(e)
        next(e)
    }
})

router.get('/flyou/:profile_id/all', async (req, res, next) => {
    const profile_id = Number(req.params.profile_id);

    try{
        const follow = await db.follow.findMany({
            where: {
                followingId: profile_id
            },
            include: {
                follower: true // include the follower User records
            }
        })
        
        res.send(follow)
    }catch(e){
        console.log(e)
        next(e)
    }
})

export default router;