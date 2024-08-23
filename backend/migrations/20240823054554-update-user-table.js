'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * This migration adds a unique index on the `email` column of the `users` table.
   */
  await queryInterface.addIndex('users', ['email'], {
    unique: true,
    name: 'unique_email_index'
  });
}

export async function down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * This migration removes the unique index from the `email` column of the `users` table.
   */
  await queryInterface.removeIndex('users', 'unique_email_index');
}
