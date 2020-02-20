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

exports.seed = async (knex) {
  // Deletes ALL existing entries
  await knex('vehicle').del()
      let fakeCars = [];
      const desiredFakeCars = 1000;
      //console.log(createFakeCar())
      for (let i = 0; i <= desiredFakeCars; i++) {
        fakeCars.push(createFakeCar())
        if (i % 100 === 0) {
          await knex('vehicle').insert(fakeCars);
          fakeCars = [];
          console.log(i)
      }
      
    }
  }
