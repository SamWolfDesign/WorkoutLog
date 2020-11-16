const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'Bongripper69420!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to workout-log postgres database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;