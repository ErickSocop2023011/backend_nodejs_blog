import { Router } from 'express';
import { createPost, getPosts, getPostById, deletePost, addComment, filterPosts } from './post.controller.js';
import { createPostValidator, filterPostsValidator, getPostByIdValidator, addCommentValidator } from '../middlewares/post-validator.js';  

const router = Router();

/**
 * @swagger
 * /post/:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               course:
 *                 type: string
 *                 enum: [Technology, Workshop, Supervised Practice]
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Error creating post
 */
router.post('/', createPostValidator, createPost);

/**
 * @swagger
 * /post/:
 *   get:
 *     summary: Get all posts with pagination
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of posts to retrieve
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of posts to skip
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Error fetching posts
 */
router.get('/', getPosts);

/**
 * @swagger
 * /post/filter:
 *   get:
 *     summary: Filter posts based on various criteria
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *         description: Filter by course
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title
 *       - in: query
 *         name: sortByDate
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort by date (ascending or descending)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date
 *     responses:
 *       200:
 *         description: Filtered list of posts
 *       500:
 *         description: Error filtering posts
 */
router.get('/filter', filterPostsValidator, filterPosts);

/**
 * @swagger
 * /post/{pid}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error fetching post
 */
router.get('/:pid',getPostByIdValidator, getPostById);

/**
 * @swagger
 * /post/{pid}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error deleting post
 */
router.delete('/:pid', deletePost);

/**
 * @swagger
 * /post/{pid}:
 *   patch:
 *     summary: Add a comment to a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - text
 *             properties:
 *               username:
 *                 type: string
 *                 description: Name of the user adding the comment
 *               text:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Error adding comment
 */
router.patch('/:pid', addCommentValidator, addComment);

export default router;
