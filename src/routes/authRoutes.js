const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/hello', (req, res) => {
  res.send('Hello bruh');
});

// router.get('/signup', authController.signup_get);
// router.get('/login', authController.login_get);
// router.get('/', (req, res) => res.render('home'));
// router.get('/smoothies', (req, res) => res.render('smoothies'));

module.exports = router;
