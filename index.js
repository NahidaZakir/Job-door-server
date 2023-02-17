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

        app.get('/fresherjobs', async (req, res) => {
            const query = {};
            const fresherJobs = await fresherJobCollection.find(query).toArray();
            res.send(fresherJobs);
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