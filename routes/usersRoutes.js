const express = require('express');
const router = express.Router();
// const passport = require('passport');
// const passportConf = require('../config/passport');

const usuarioController = require('../controllers/userController');

router.get('/', usuarioController.getUsers);

router.post('/signup', usuarioController.signUp);

router.post('/signin', usuarioController.signIn);

// const { validateBody, schemas } = require ('../helpers/routeHelpers');

// const UsersController = require('../controllers/users');

// router.route('/signup')
//     .post(validateBody(schemas.authSchema), UsersController.signUp);

// router.route('/signin')
//     .post(UsersController.signIn);

// router.route('/secret')
//     .get(passport.authenticate('jwt', { session: false }), UsersController.secret);

module.exports = router;
