
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vehicles', (table) => {
    table.increments();
    table.integer('year').notNullable;
    table.string('make').notNullable;
    table.string('model').notNullable;
    table.string('class').notNullable;
    table.string('price').notNullable;
    table.string('miles').notNullable;
    table.string('engine_l_cyl').notNullable;
    table.string('transmission').notNullable;
    table.string('exterior_color').notNullable;
    table.string('iterior_color').notNullable;
    table.text('picture').notNullable;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vehicles')
};
