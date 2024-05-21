const {Router}  = require('express');
const adminController = require('../controller/adminController');
const { route } = require('./authroutes');

const router = Router();

router.route('/add-product')
    .post(adminController.addProduct)

router.route('/get-product')
    .get(adminController.getProduct)

router.route("/del-product")
    .delete(adminController.deleteProduct)

router.route("/edit-product")
    .patch(adminController.editProduct)

router.route("/sendmessage")
    .post(adminController.sendMessage)

router.route("/get-queries")
    .get(adminController.getQueries)

router.route("/delete-message")
    .delete(adminController.deleteMessage)

module.exports = router;