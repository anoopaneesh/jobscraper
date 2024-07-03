
import { MongoClient } from "mongodb";

const JOBSCRAPERDB = 'jobscraper' 

const state = {
    db: null, 
}
const client = new MongoClient(process.env.MONGO_URL);

async function connectDB() {
    try {
        await client.connect();
        await client.db(JOBSCRAPERDB).command({ ping: 1 });
        state.db = client.db(JOBSCRAPERDB)
        console.log("You successfully connected to MongoDB!");
    } catch (err) {
        console.log("Error connecting mongodb", err)
    }
}

function get() {
    return state.db
}


export default { get, connectDB }

