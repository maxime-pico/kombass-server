"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("It's alive!");
});
module.exports = router;
//# sourceMappingURL=index.js.map