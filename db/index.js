import mongoose from "mongoose";
import "dotenv/config";
//Connet to MongoDB
mongoose.connect(process.env.MONGODB_URL);

// Defining Schemas
const AdminSchema = new mongoose.Schema({
  // Admin Schema Defination
  username: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // User Schema Defination
  username: String,
  password: String,
  purchasedCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Cource Schema Defination
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

// module.exports = { Admin, User, Course }; // Used for commonJS
export default { Admin, User, Course }; // Used for Module Js

// DB password mongo123
