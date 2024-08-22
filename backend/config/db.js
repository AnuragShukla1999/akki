import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('demo', 'root', 'anurag7587709264@#$%shukla', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false
});


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;