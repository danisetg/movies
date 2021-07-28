// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

var url = 'mongodb://localhost/movies';

var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log('DB Connection Error: ${err.message}');
});

// CSV file name
const fileName = 'movies.csv';
var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
             film: source[i]['Film'],
             genre: source[i]['Genre'],
             lead_studio: source[i]['Lead Studio'],
             audience_score: source[i]['Audience score %'],
             profitability: source[i]['Profitability'],
             rotten_tomatoes: source[i]['Rotten Tomatoes %'],
             worldwide_gross: source[i]['Worldwide Gross'],
             year: source[i]['Year'],
             createdAt: Date.now,
         };
         arrayToInsert.push(oneRow);
     }
     //inserting into the table “employees”
     var collectionName = 'movies';
     var collection = dbConn.collection(collectionName);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log('Import CSV into database successfully.');
         }
     });
});