# mongodb-hackathon2022-cloud-function

Cloud function that updates the MongoDB database for the [*The Newsroom*](https://github.com/margacampos/MongoDB-hackathon-2022) project with new data from the GDELT BigQuery dataset.

## Explanation:
This cloud function is triggered by a Pub/Sub message and therefore listens for event and context. You can find more about cloud functions triggered by Pub/Sub [here](https://cloud.google.com/functions/docs/writing/background).

Once it is triggered, it creates a query job on BigQuery and saves that job to then retrieve the query results. You can find more information about how to do this [here](https://cloud.google.com/nodejs/docs/reference/bigquery/latest).

After it makes sure the information has been retrieved, it deletes all documents on the MongoDB database and inserts the new ones.

Once this is done, it updates all the documents with its respective titles by calling the https://mongo-db-hackathon-2022.vercel.app/news-title-generator.

