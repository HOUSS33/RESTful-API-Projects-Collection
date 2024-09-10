import  app from "./server.js"
import  ReviewsDAO from "./DAO/reviewsDAO.js"
import mongodb  from "mongodb"
const PORT = 8080;

const MongoClient = mongodb.MongoClient;
const MONGODB_USERNAME ="houssa";
const MONGODB_PASSWORD = "robin";

const uri = `mongodb+srv://houssa279:robin@cluster0.3zkii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;




MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
})
.catch(err=> {
    console.error(err.stack);
    process.exit(1);
})
.then(async client =>{
    try {
        console.log("Connected to MongoDB! Injecting DB...From index.js");
        await ReviewsDAO.injectDB(client);
        console.log("DB injected successfully!");

        app.listen(PORT, () =>{
            console.log(`connected on https://localhost:${PORT}`);
        });
    } catch(e){
        console.error(`Error during DB injection: ${e.message}`);
        process.exit(1);
    }
})
