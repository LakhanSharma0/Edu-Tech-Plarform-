const express = require("express")
const router = express.Router()
const {getInterviewDetails, generateInterview } = require("../controllers/GenrateInterview");

router.post("/generate-Interview", generateInterview);
router.get("/getInterviewDetails", getInterviewDetails);

module.exports = router;