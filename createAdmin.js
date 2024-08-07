const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/Admin');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const username = 'admin'; // Change this to your desired admin username
    const password = 'adminpassword'; // Change this to your desired admin password

    // Check if admin already exists
    let admin = await Admin.findOne({ username });
    if (admin) {
      console.log('Admin already exists');
      process.exit(1);
    }

    // Create new admin
    admin = new Admin({
      username,
      password: await bcrypt.hash(password, 10)
    });

    await admin.save();
    console.log('Admin created successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdmin();
