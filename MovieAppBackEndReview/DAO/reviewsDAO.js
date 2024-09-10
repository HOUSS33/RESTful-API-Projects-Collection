import mongodb from "mongodb"

const {ObjectId} = mongodb;
let reviews;

export default class ReviewsDAO {

    static async injectDB(conn){
        if (reviews){
            console.log("Already Connected to db. From injectDB(conn)");
            return;
        }

        try{
            console.log("Injecting into DB.....From injectDB(conn)");
            reviews = await conn.db("Movies").collection("Reviews");
            if (reviews){
                console.log("DB injected Successfully.From injectdb(conn)");
            }
            console.log(reviews);

        } catch(e) {
            console.error(`Unable to establish handles on userDAO: ${e.message}`);
            return { error: e.message};
        }
    }

    //Supppose the function input satisfy all rules
    static async addReview(movieid, user, review) {
        try{

            console.log(movieid, user, review);
            let reviewDoc = {
                movieid: movieid,
                user: user,
                review: review,
            };

            console.log("Adding Review to DB...From addReview()");
            let reviewResponse = await reviews.insertOne(reviewDoc);
            if(reviewResponse){
                console.log("Successffully inserted into db.From addReview()");
            }
            console.log(reviewResponse);
            return reviewResponse;

        } catch(e){
            console.error(`Unable to addReview to DB: ${e.message} `);
            return {error: e.message};
        }
    }


    static async getReview(reviewid){
        try{
            console.log("getting review from DB...");
          return await reviews.findOne({_id: new ObjectId(reviewid)});
        } catch(e){
           console.error(`Unable to get review from db: ${e}`);
           return { error: e.message};
         }
      }



    static async updateReview(reviewid, user, review) {
        try {
            console.log("updating review in DB...");
            return await reviews.updateOne(
                { _id: new ObjectId(reviewid) },  // Filter
                { $set: { user: user, review: review } }  // Update
            );
        } catch (e) {
            console.error(`Unable to update review in db: ${e}`);
            return { error: e.message };
        }
    }




      static async deleteReview(reviewid){
         try{
             console.log("deleting review from DB...");
             return await reviews.deleteOne({_id: new ObjectId(reviewid)});
         }
         catch(e){
           console.error(`Unable to delete review from db: ${e}`);
           return {error: e.message};
         }
      }

       // assuming the movieid is a valid string
       static async getReviewsByMovieId(movieid){
          try{
             console.log("getting reviews from DB...");
             let cursor = await reviews.find({movieid: parseInt(movieid)});
             return await cursor.toArray();
          } catch(e) {
             return { error: e};
          }
       }
}

