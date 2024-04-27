'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('categories', {
        id: Sequelize.INTEGER,
        title: Sequelize.STRING,
        description: Sequelize.LONGTEXT,
        status: Sequelize.ENUM,
      });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
