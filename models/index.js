'use strict'

const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/teas', { logging: false });

const Tea = db.define('tea', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.INTEGER,
  category: Sequelize.ENUM('green', 'black', 'herbal')
}, {
  // add more functionality to our Tea model here!
  getterMethods: {
    dollarPrice: function() {
      var priceStr = this.price.toString();
      console.log("inside the settermethod");
      return "$" + priceStr.substring(0, priceStr.length-2) + "." + priceStr.substring(priceStr.length-2);
    }
  }
})

Tea.findByCategory = function(type) {
  return this.findAll({
   // where: {category: type}
  });
}

module.exports = { db, Tea };
