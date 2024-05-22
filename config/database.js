const mongoose = require('mongoose');
const { MONGODB_URI, MONGODB_DBNAME } = process.env;

exports.connect = () => {
  mongoose.connect(`${MONGODB_URI}/${MONGODB_DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.log('Database connection failed. Exiting now...');
    console.error(error);
    process.exit(1);
  });
};
