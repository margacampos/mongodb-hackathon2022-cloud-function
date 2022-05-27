const { MongoClient } = require("mongodb");
const {BigQuery} = require('@google-cloud/bigquery');
require('dotenv').config()


exports.databaseUpdate = async(event, context) => {
  
    async function queryGDELT() {
  
      const bigquery = new BigQuery();
    
      try {
        const query = `SELECT DISTINCT EventCode,
        SQLDATE,
        AvgTone,
        Actor1Type1Code,
        Actor1CountryCode,
        Actor2Type1Code,
        Actor2CountryCode,
        GoldsteinScale,
        SOURCEURL
    FROM \`gdelt-bq.gdeltv2.events\`
    WHERE SQLDATE>=CAST(FORMAT_DATE("%Y%m%d", DATE_SUB(CURRENT_DATE(), INTERVAL 1 WEEK)) AS INT)
        AND NumArticles >= 10
        AND GoldsteinScale IS NOT NULL
    ORDER BY
        AvgTone DESC,
        GoldsteinScale DESC,
        SQLDATE DESC
    LIMIT 1000;`;
    
        const options = {
          // Specify a job configuration to set optional job resource properties.
            query:query,
           location:"US",
       };
     
       // Make API request.
       const [job] = await bigquery.createQueryJob(options);
       console.log(`Job ${job.id} started.`);
    
       // Wait for the query to finish
        const [rows] = await job.getQueryResults();
      
        // return the results
        return rows;
      } catch (error) {
         console.log(error)
      }
    
    }

    try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const database = client.db(process.env.MONGODB_DB);
        const events = database.collection("events");
        const info = await queryGDELT();
        if(info){
          await events.deleteMany({});
          await events.insertMany(info);
          console.log("done");
        } else{
          throw "BigQuery not working."
        }

      } catch(err){
          console.log(err);
      }finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
  };



 