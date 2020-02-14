require('dotenv').config(); 
const express = require('express'); 
const {Client} = require('pg'); 
const {Pool} = require('pg'); 
const cors = require('cors');
const PORT = process.env.PORT || 3008;
const app = express(); 

const pool = new Pool({
  user: 'shannonhurley',
  host: 'localhost',
  database: 'similiar_vehicles',
  port: 5432
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

app.use(express.static(__dirname + '/../client/dist')); 
app.use(express.json()); 
app.use(cors());


// Database integration 


app.get('/api/similar_vehicles', (req, res) => {
    const condition = 'Coupe'; 

    const getQueryString = `SELECT * FROM vehicle WHERE class = "${condition}" LIMIT 3`; 

    pool.query(getQueryString, (err, results) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({results: results}); 
        }
    }); 
}); 
app.get('/api/similar_vehicles/All', (req, res) => {
    const condition = 'Coupe'; 
    console.log('ran')
    const getQueryString = 'SELECT * FROM vehicle'; 

    pool.query(getQueryString, (err, results) => {
        if (err) {
            //console.log(err)
            res.status(400).send(err);
        } else {
            //console.log('success', results.rows)
            res.status(200).json({results: results.rows}); 
        }
    }); 
}); 
app.post('/api/similar_vehicles', (req, res) => {
    const {year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture} = req.body;
    console.log('server post', req.body)
    const getQueryString = `INSERT INTO vehicle (year, make, model, class, price, miles, engine_L_Cyl, transmission, exterior_color, interior_color, picture)
    VALUES (${year}, '${make}', '${model}', '${vClass}', '${price}', '${miles}', '${engineLCyl}', '${transmission}', '${exteriorColor}', '${interiorColor}', '${picture}')`; 

    pool.query(getQueryString, (err, results) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({results: results}); 
        }
    }); 
}); 
app.patch('/api/similar_vehicles', (req, res) => {
    let {id, year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture} = req.body;
    console.log({id, year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture})
    const getQueryString = 'UPDATE vehicle SET year = ?, make = ?, model = ?, class = ?, price = ?, miles = ?, engine_L_Cyl = ?, transmission = ?, exterior_color = ?, interior_color = ?, picture = ? WHERE id = ?' 

    pool.query(getQueryString, [year, make, model, vClass, price, miles, engineLCyl, transmission, exteriorColor, interiorColor, picture, id], (err, results) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(202).json('Table updated successfully'); 
        }
    }); 
}); 
app.delete('/api/similar_vehicles', (req, res) => {
    const id = req.body.id; 

    const getQueryString = `DELETE FROM vehicle WHERE id = ${id}`; 

    pool.query(getQueryString, (err, results) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json({results: results}); 
        }
    }); 
}); 

app.listen(PORT, () => {
    console.log(`Listening from: ${PORT}`); 
}); 

