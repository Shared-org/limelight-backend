const express = require("express");
const { test } = require("../controllers/test.controller");
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Used for testing the express router 
 *     description: Used for testting wether the express router is running or not.
 *     responses:
 *     200:
 *       description: Success Response
 * 
*/


router.get("/test",test);

module.exports = router;