const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {  // <-- changed here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.bgCyan.white);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1); 
  }
};

module.exports = connectDb;
