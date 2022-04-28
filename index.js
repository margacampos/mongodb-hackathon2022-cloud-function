const { MongoClient } = require("mongodb");
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
require('dotenv').config()
// const client = new MongoClient(uri);

// exports.databaseUpdate = async(event, context) => {
//     try {
//         await client.connect();
    
//         const database = client.db('events');
//         const recentEvents = database.collection('recentEvents');
    
//         // Query for a movie that has the title 'Back to the Future'
//         const query = { title: 'Back to the Future' };
//         const movie = await movies.findOne(query);
    
//         console.log(movie);
//       } catch(err){
//           console.log(err);
//       }finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//       }
//     const message = event.data
//       ? Buffer.from(event.data, 'base64').toString()
//       : 'Hello, World';
//     console.log(message);
//   };



  async function getJob() {
    // Get job properties.
    try {
        const jobId = process.env.GOOGLE_JOB_ID;

        // Create a job reference
        const job = bigquery.job(jobId);

        // Retrieve job
        const [jobResult] = await job.get();
    
        console.log(jobResult);

    } catch (error) {
        console.log(error)
    }
    
  }
  // [END bigquery_get_job]
  getJob();