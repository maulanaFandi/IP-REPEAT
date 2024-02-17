"use strict";
const { hashSync } = require('bcryptjs');
const data = require('../user.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let result = data.map((e)=>{
      delete e.id,
      e.password = hashSync(e.password, 10)
      e.createdAt = new Date()
      e.updatedAt = new Date()
      return e
    })
    await queryInterface.bulkInsert('Users', result)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  },
};