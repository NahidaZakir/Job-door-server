const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();


const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gj8nsdx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const fresherJobCollection = client.db('Job-Door').collection('fresher-jobs');

        app.get('/fresherjobs-6', async (req, res) => {
            const query = {};
            const sort = { length: -1 };
            const limit = 6;
            const fresherJobs6 = await fresherJobCollection.find(query).sort(sort).limit(limit).toArray();
            res.send(fresherJobs6);
        });
        app.get('/fresherjobs-all', async (req, res) => {
            const query = {};
            const fresherJobsAll = await fresherJobCollection.find(query).toArray();
            res.send(fresherJobsAll);
        });
    }
    finally {

    }
}
run().catch(error => {
    console.log(error);
});

app.get('/', async (req, res) => {
    res.send('Job Door server is running');
})

app.listen(port, () => console.log(`Job Door running on ${port}`))