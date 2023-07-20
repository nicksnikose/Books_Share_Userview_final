mongoose = require("mongoose")

const express = require("express")
const adminController = require("../controller/adminController")

const router = express.Router();
router
  .route("/admin/login")
  .post(adminController.loginAdmin)

  router.put("/products/:created/", adminController.updatemyprice)  //getting user uploading product 


module.exports = router;
