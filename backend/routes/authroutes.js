const {Router} = require("express");
const authController = require("../controller/authController")
const authProvider = require('../middlewares/authProvider')

const router = Router();

// router.route("/")
//     .get(authController.getHome)

router.route('/register')
    .post(authProvider.authCheck,authController.signupPost)

router.route('/login')
    .post(authController.loginPost)

// router.route('/authcheck')
//     .get(authController.authCheck)

router.route('/logout')
    .post(authController.logoutPost)


module.exports = router;