import mongoose, { model, mongo } from "mongoose";

//Connet to MongoDB
mongoose.connect(
  "mongodb+srv://xennyirl:mongo123@cluster0.3h1bn.mongodb.net/Course_Selling_App"
);

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
  purchasedCourse: [
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
