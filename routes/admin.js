import { Router } from "express";
import adminMiddleware from "../middleware/admin.js";
// import { Admin } from "../db/index.js"; // The Wrong way
import models from "../db/index.js";
const { Admin, Course } = models;

const router = Router();

router.get("/", (req, res) => {
  res.send("Admin Page");
});

router.post("/signup", async (req, res) => {
  // Implement admin signup login
  const username = req.body.username;
  const password = req.body.password;

  // Check if a user with this username & password already exists
  //   Admin.create({
  //     username: username,
  //     password: password,
  //   }).then(() => {
  //     res.json({ msg: "Admin Created Successfully" });
  //   });
  const newAdmin = await Admin.create({
    username,
    password,
  });
  res.json({ msg: "Admin Created Successfully", adminId: newAdmin._id });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  // Ideally some input validation thing is used to validate the user inputs
  //   Course.create({
  //     title,
  //     description,
  //     imageLink,
  //     price,
  //   }).then(() => {
  //     res.json({ msg: "Course Created Successfully" });
  //   });
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.json({ msg: "Course Created Successfully", courseID: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all the courses logic
  const allCources = await Course.find({});
  res.json(allCources);
});

export default router;
