import { Router } from 'express';
import { getRandomKey } from '../services/keys.js';

const router = Router();

// GET key
router.get('/', async (req, res) => {
    const key = await getRandomKey();
    if(key) {
        res.json({
            success : true,
            key : key
        });
    } else {
        res.status(404).json({
            success : false,
            message : 'No key found'
        });
    }
});

export default router;