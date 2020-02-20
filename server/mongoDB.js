//default port 27017
require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3008;
const app = express(); 

app.use(express.static(__dirname + '/../client/dist')); 
app.use(express.json()); 
app.use(cors());


if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost:27017/similar_vehicles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
})

let vehicleSchema = new mongoose.Schema({
  year: Number,
  make: String,
  model: String,
  class: String,
  price: String,
  miles: String,
  engine_l_cyl: String,
  transmission: String,
  exterior_color: String,
  interior_color: String,
  picture: String
})

const Vehicle = mongoose.model('Display', vehicleSchema)
// module.exports.db = db
// let vehicle1 = new Vehicle({
//   year: 2016,
//   make: 'Ford',
//   model: 'F150',
//   class: 'TRUCK',
//   price: '$15,000',
//   miles: '100,000',
//   engine_l_cyl: 'V8',
//   transmission: 'Manual',
//   exterior_color: 'Green',
//   interior_color: 'Leather',
//   picture: 'https://blogmedia.dealerfire.com/wp-content/uploads/sites/715/2018/11/2019-Toyota-Highlander-in-Shoreline-Blue-Pearledit_o.jpg'
// })
// let vehicle2 = new Vehicle({
//     year: 2016,
//     make: 'Ford',
//     model: 'F150',
//     class: 'TRUCK',
//     price: '$15,000',
//     miles: '100,000',
//     engine_l_cyl: 'V8',
//     transmission: 'Manual',
//     exterior_color: 'Green',
//     interior_color: 'Leather',
//     picture: 'https://a2ee4b017484f99db28d-250ec659588d774a6f990238e39cf450.ssl.cf1.rackcdn.com/5FRYD4H51HB000535/393d5e0bb0d20777f157a40cd8630803.jpg'
//   })
//   let vehicle3 = new Vehicle({
//       year: 2016,
//       make: 'Ford',
//       model: 'F150',
//       class: 'TRUCK',
//       price: '$15,000',
//       miles: '100,000',
//       engine_l_cyl: 'V8',
//       transmission: 'Manual',
//       exterior_color: 'Green',
//       interior_color: 'Leather',
//       picture: 'https://a2ee4b017484f99db28d-250ec659588d774a6f990238e39cf450.ssl.cf1.rackcdn.com/5FRYD4H51HB000535/393d5e0bb0d20777f157a40cd8630803.jpg'
//     })
// Vehicle.createCollection().then(()=>{
//   vehicle1.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   })
//   vehicle2.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   })
//   vehicle3.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
//   });
// })
 
app.get('/api/similar_vehicles', (req, res) => {
  Vehicle.find(function (err, docs) {
    if (err) return handleError(err);
    res.json({results:docs})
  })
}); 

app.post('/api/similar_vehicles', (req, res) => {
  const {year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture} = req.body;
  const newVehicle = new Vehicle({
    year: year,
    make: make,
    model: model,
    class: vClass,
    price: price,
    miles: miles,
    engine_l_cyl: engineLCyl,
    transmission: transmission,
    exterior_color: exteriorColor,
    interior_color: interiorColor,
    picture: picture
    })
  newVehicle.save(function (err) {
    if (err) return handleError(err);
    // saved!
  })
}); 
app.patch('/api/similar_vehicles', (req, res) => {
  const {id, year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture} = req.body;
  Vehicle.updateOne({
    "_id": id
  },{
    year: year,
    make: make,
    model: model,
    class: vClass,
    price: price,
    miles: miles,
    engine_l_cyl: engineLCyl,
    transmission: transmission,
    exterior_color: exteriorColor,
    interior_color: interiorColor,
    picture: picture
  }, (err, res) => {
  });
}); 

app.delete('/api/similar_vehicles', (req, res) => {
  const id = req.body.id; 
  console.log('id', req.body)
  Vehicle.findOneAndDelete({ "_id" : id }, function (err) {
    if (err) console.log(err);
  });
}); 

var faker = require('faker');

const createFakeCar = () => ({
    year: faker.random.number({min:2016, max:2020}), 
    make: faker.name.firstName(), 
    model: faker.name.lastName(), 
    class: faker.name.prefix(), 
    price: `$${faker.random.number({min:1, max:100})},${faker.random.number({min:100, max:999})}`,
    miles: `${faker.random.number({min:0, max:100000})}`, 
    engine_l_cyl: faker.name.firstName(), 
    transmission: faker.name.firstName(), 
    exterior_color: faker.internet.color(), 
    interior_color: faker.internet.color(), 
    picture: faker.random.image()
});

seedMongo = async () => {
  // Deletes ALL existing entries
  await Vehicle.deleteMany({})
      let fakeCars = [];
      const desiredFakeCars = 10000000;
      //console.log(createFakeCar())
      for (let i = 0; i <= desiredFakeCars; i++) {
        fakeCars.push(createFakeCar())
        if (i % 1000 === 0) {
          await Vehicle.insertMany(fakeCars);
          fakeCars = [];
          if (i % 100000 === 0) {
          console.log(i)
          }
      }
      
    }
  }
// seedMongo()
app.listen(PORT, () => {
  console.log(`Listening from: ${PORT}`); 
}); 