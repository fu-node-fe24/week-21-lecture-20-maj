import { Router } from 'express';
import { authorizeKey } from '../middlewares/authorize.js';
import { getUser, registerUser } from '../services/users.js';
import { v4 as uuid } from 'uuid';

const router = Router();

// Middlewares
router.use(authorizeKey);

// GET logout
router.get('/logout', (req, res) => {
    global.user = null;
    res.json({
        success : true,
        message : 'Logout successful'
    });
});

// POST login
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    if(username && password) {
        const user = await getUser(username);
        if(user) {
            if(user.password === password) {
                global.user = user;
                res.json({
                    success : true,
                    message : 'Logged in successfully'
                });
            } else {
                next({
                    status : 400,
                    message : 'Wrong username or password'
                });
            }
        } else {
            next({
                status : 400,
                message : 'No user found!'
            });
        }
    } else {
        next({
            status : 400,
            message : 'username and password are required'
        });
    }
});

// POST register
router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    if(username && password) {
        const result = await registerUser({
            username : username,
            password : password,
            userId : uuid().substring(0, 5)
        });
        if(result) {
            res.status(201).json({
                success : true,
                message : 'User created successfully'
            });
        } else {
            next({
                status : 400,
                message : 'Registration unsuccessful'
            });
        }
    } else {
        next({
            status : 400,
            message : 'username and password are required'
        });
    }
});

export default router;