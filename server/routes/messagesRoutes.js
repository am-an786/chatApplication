const { addMessage, getMessage } = require("../controller/messagesController");

const router = require("express").Router();
router.post("/addmsg/",addMessage);
router.post("/getmsg/",getMessage);



module.exports=router;