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
        const experiencedJobCollection = client.db('Job-Door').collection('experienced-jobs');
        const BDCollection = client.db('Job-Door').collection('BdTech');
        const WorldWideCollection = client.db('Job-Door').collection('WorldWideTech');

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

        app.get('/experiencedjobs-6', async (req, res) => {
            const query = {};
            const sort = { length: -1 };
            const limit = 6;
            const experiencedJobs6 = await experiencedJobCollection.find(query).sort(sort).limit(limit).toArray();
            res.send(experiencedJobs6);
        });
        app.get('/experiencedjobs-all', async (req, res) => {
            const query = {};
            const experiencedJobsAll = await experiencedJobCollection.find(query).toArray();
            res.send(experiencedJobsAll);
        });
        app.get('/bangladesh', async (req, res) => {
            const query = {};
            const bdtech = await BDCollection.find(query).toArray();
            res.send(bdtech);
        });
        app.get('/worldwide', async (req, res) => {
            const query = {};
            const worldwide = await WorldWideCollection.find(query).toArray();
            res.send(worldwide);
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