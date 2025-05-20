import { Router } from 'express';
import { authorizeKey, authorizeUser } from '../middlewares/authorize.js';
import { createNewBlogPost, deletePost, getAllPosts, getPostsByUserId, updatePost } from '../services/posts.js';
import { v4 as uuid } from 'uuid';

const router = Router();

// Middlewares
router.use(authorizeKey);

// GET all posts
router.get('/', async (req, res, next) => {
    const result = await getAllPosts();
    if(result) {
        res.json({
            success : true,
            posts : result
        });
    } else {
        next({
            status : 404,
            message : 'No posts found'
        })
    }
});

// GET all posts by userID
router.get('/:userId', async (req, res, next) => {
    const result = await getPostsByUserId(req.params.userId);
    if(result) {
        res.json({
            success : true,
            posts : result
        });
    } else {
        next({
            status : 404,
            message : 'No posts found'
        });
    }
});

// POST new post
router.post('/', authorizeUser, async (req, res, next) => {
    const { title, text } = req.body;
    if(title && text) {
        const result = await createNewBlogPost({
            title : title,
            text : text,
            userId : global.user.userId,
            postId : uuid().substring(0, 5)
        });
        if(result) {
            res.status(201).json({
                success : true,
                message : 'New blog post created'
            });
        } else {
            next({
                status : 400,
                message : 'No post created'
            });
        }
    } else {
        next({
            status : 400,
            message : 'Both title and text required'
        });
    }
});

// PUT post by postID
router.put('/:postId', authorizeUser, async (req, res) => {
    const { title, text } = req.body;
    if(title && text) {
        const result = await updatePost(req.params.postId, {
            title : title,
            text : text,
            userId : global.user.userId,
            postId : uuid().substring(0, 5)
        });
        if(result) {
            res.json({
                success : true,
                message : 'Blog post updated successfully'
            });
        } else {
            next({
                status : 400,
                message : 'Could not update'
            });
        }
    } else {
        next({
            status : 400,
            message : 'Both title and text required'
        });
    }
});

// DELETE post by postID
router.delete('/:postId', authorizeUser, async (req, res, next) => {
    const result = await deletePost(req.params.postId);
    if(result) {
        res.json({
            success : true,
            message : 'Post deleted successfully'
        });
    } else {
        next({
            status : 404,
            message : 'Could not delete post'
        });
    }
});

export default router;