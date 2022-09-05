var express = require("express");
var controller = require("../controller/Cmain");
var controllerV = require("../controller/CVisitor");
const router = express.Router();

router.get("/", controller.main);
router.post("/login", controller.login);
router.get("/visitor", controllerV.visitor);
router.post("/visitor/post", controllerV.post_visitor);
router.post("/visitor/delete", controllerV.delete_visitor);
router.post("/visitor/get", controllerV.get_visitor);
router.post("/visitor/update", controllerV.update_visitor);

module.exports = router;