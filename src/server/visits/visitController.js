const Sequelize = require('sequelize');
const sequelize = new Sequelize('	postgres://sritcuej:k4TShGEbzUCXQ-rbyq4fd0JNtHxy9GKb@baasu.db.elephantsql.com:5432/sritcuej');

const visitController = {};
visitController.handleVisit = handleVisit;

function handleVisit(req, res, next) {
  sequelize.query(`INSERT INTO visits (ip_address) VALUES ('${JSON.stringify(req.ipInfo)}')`).then(() => {
    sequelize.query('SELECT * FROM visits').then(visits => {
      // console.log(visits[0]);
      console.log(req.ipInfo)
    });
  });
  next();
}

module.exports = visitController;