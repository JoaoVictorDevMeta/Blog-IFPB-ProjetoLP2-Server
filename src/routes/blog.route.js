import express from "express";
import { db } from "../lib/db.js";

const router = express.Router();

router.get('/', (req ,res) => {
    res.send('acessando blog')
})

router.get('/recent', async(req, res, next) => {
  try{
    const recentBlogs = await db.blog.findMany({
      take: 7,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        content: {
          take: 1
        }
      }
    });

    res.send(recentBlogs)
  } catch(e){
    console.log(e)
    next(e)
  }
})

router.get('/trending', async(req, res, next) => {
  try{
    const trendingBlogs = await prisma.blog.findMany({
      take: 7,
      orderBy: {
        likes: {
          _count: 'desc'
        }
      },
      include: {
        content: {
          take: 1
        }
      }
    });

    res.send(trendingBlogs)
  } catch(e){
    console.log(e)
    next(e)
  }
})

router.get('/:id', async (req , res, next) => {
    const id = Number(req.params.id);
    
    if(!id) return res.status(400).send('Invalid ID');

    try{
        const blog = await db.blog.findUnique({
            where: {
              id: id
            },
            include: {
              author: true,
              content: true,
            },
        });

        if(!blog){
          return res.status(404).send('Blog not found')
        }

        return res.send(blog)
    }catch(e){
        console.log(e)
        next(e)
    }
})

// this get functions use lazy loading
// it loads just the comments of an especific parent
// loads the main comments too
// i did this to reduce server queries
router.get('/:id/comments/:commentId?', async (req, res, next) => {
  const blogId = Number(req.params.id);
  const commentId = req.params.commentId ? Number(req.params.commentId) : null; // verifies if exists some parent

  try{
      const comments = await db.comment.findMany({
        where: {
          blogId: blogId,
          parentId: commentId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            }
          }
        },
      });

      // fetch all comments that are parents in a single query
      // this is necessary to the "see replies" button
      const parentComments = await db.comment.findMany({
        where: {
          parentId: {
            in: comments.map(comment => comment.id),
          },
        },
        select: {
          parentId: true,
        },
      });

      // using Set for faster lookup
      const parentCommentIds = new Set(parentComments.map(comment => comment.parentId));

      // add the isParent property to the comments
      comments.forEach(comment => {
        comment.isParent = parentCommentIds.has(comment.id);
      });

      res.json(comments)
  }catch(e){
      console.log(e)
      next(e)
  }
})

export default router;