const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/', (req, res) => res.render('home'));
router.get('/smoothies', (req, res) => res.render('smoothies'));

module.exports = router;
