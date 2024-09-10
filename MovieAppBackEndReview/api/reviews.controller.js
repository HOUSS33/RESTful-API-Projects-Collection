import ReviewsDAO from "../DAO/reviewsDAO.js"

export default class ReviewsController {

  static async apiPostReview(req, res, next) {
    try{
      const movieId = req.body.movieid;
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review,
      );
      // Check if the response contains an error
      if (reviewResponse.error) {
          // Throw an error with the error message to be caught by the catch block
          throw new Error(reviewResponse.error);
      }
      // If no error, send a success response
      res.json({status: "success"});
    } catch(e) {
      // Handle the error and respond with a 500 status and error message
      res.status(500).json({ error: e.message });
    }
  }


  static async apiGetReview(req, res, next) {
    try{
      let id = req.params.id;

      // Validate reviewId
      if (!id) {
          return res.status(400).json({ error: "Review ID is required" });
      }

      let review = await ReviewsDAO.getReview(id);

      if (review.error) {
          // Handle the case where getReview returned an error
          console.error(`Error getting review: ${review.error.message}`);
          res.status(500).json({ error: review.error });
          return;
      }

      if (!review) {
        res.status(404).json({ error: "review Not found"});
        return;
      }
      res.json(review)
    } catch(e) {} {
      console.log(`api, ${e.message}`);
      res.status(500).json({ error: e.message});
      return;
    }
  }

  static async apiUpdateReview(req, res, next) {
    try{
      const reviewId = req.params.id;
      const review = req.body.review;
      const user = req.body.user;

      if (!reviewId) {
          return res.status(400).json({ error: "Review ID is required" });
      }

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review,
      );

      var {error} = reviewResponse;
      if (error) {
        res.status(400).json({error});
      }

      if (reviewResponse.acknowledged === false) {
        throw new Error("the update operation was not acknowledged by the MongoDB server.");
      }

      if ( reviewResponse.matchedCount === 0 ){
        throw new Error("no documents  matched the query");
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("unable to update review");
      }

      res.json({ status: "success"});
    } catch (e) {
      res.status(500).json({ error: e })
      return;
    }
  }


  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      // Validate reviewId
      if (!reviewId) {
          return res.status(400).json({ error: "Review ID is required" });
      }

      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);

      var {error} = reviewResponse;
      if (error) {
        res.status(400).json({error})
      }

      if (reviewResponse.acknowledged === false){
        throw new Error("the delete operation was not acknowledged by the MongoDB server.");
      }
      if (reviewResponse.deletedCount === 0){
        throw new Error("no documents was deleted");
      }

      res.json({ status: "success"})
    } catch (e) {
      console.error(`Error occurred: ${e}`);
      res.status(500).json({ error: e })
    }
  }

  static async apiGetReviews(req, res, next) {
    try{
      let id = req.params.id;

      if(!id){
        return res.status(400).json({ error: "Movie ID is required"});
      }

      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (reviews.error) {
        res.status(500).json({ error: reviews.error});
        return;
      }

      if (reviews.length === 0) {
        res.status(404).json({ error: "Not found"})
        return
      }

      res.json(reviews)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e})
    }

  }


}