import express from "express"
import ReviewsController from "./reviews.controller.js"

const router = express.Router() // this is a function that creates a router for us.

// this is a function that creates a router for us.
router.route("/movie/:id").get(ReviewsController.apiGetReviews)
router.route("/new").post(ReviewsController.apiPostReview)
router.route("/:id")
    .get(ReviewsController.apiGetReview)
    .put(ReviewsController.apiUpdateReview)
    .delete(ReviewsController.apiDeleteReview)


export default router