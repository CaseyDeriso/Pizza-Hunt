const router = require("express").Router();
const {
  addComment,
  removeComment,
} = require("../../controllers/comment-controller");

// set up all post and delete routes

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
router.route("/:pizzaId/:commentId").delete(removeComment);

module.exports = router;