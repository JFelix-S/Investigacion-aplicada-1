import { Sequelize } from "sequelize";

const sequelize = new Sequelize('u214874994_API','u214874994_UserAPI','Roelias123.', {
    host: '77.37.56.60',
    dialect: 'mysql'
});

export default sequelize;