const express = require('express');
const router = express.Router({ mergeParams: true });
const { signup, login } = require('../controllers/user');

router.post("/login", login);
router.post("/signup", signup);
router.route("/add_to_activity");
router.route("/get_all_activity");

module.exports = router;