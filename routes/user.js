import { Router } from "express";
import models from "../db/index.js";
import userMiddleware from "../middleware/user.js";
const { User, Course } = models;

const router = Router();

router.get("/", (req, res) => {
  res.send("User Page");
});

router.post("/signup", async (req, res) => {
  // Logic to create a user
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username,
    password,
  });
  res.json({ msg: "User Created Successfully" });
});

router.get("/courses", async (req, res) => {
  // Logic to get all the courses
  try {
    const response = await Course.find({});
    res.json(response);
  } catch (error) {
    res.json({ error: "Error fetching data" });
  }
});

// The Wrong way :- Doesn't Work

// router.post("/courses/:courseID", userMiddleware, async (req, res) => {
//   const courseID = req.params.courseID;
//   const username = req.headers.username;

//   await User.updateOne({
//     username,
//     purchasedCourse: {
//       $push: courseID, // Pushing the courseID
//     },
//   });
//   res.json("Course added");
// });

router.post("/courses/:courseID", userMiddleware, async (req, res) => {
  const courseID = req.params.courseID;
  const username = req.headers.username;

  try {
    await User.updateOne(
      { username }, // Finds the user by Username
      { $push: { purchasedCourses: courseID } } // Pushes the courseID
    );
    res.json({ msg: "Course purchased successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  try {
    const user = await User.findOne({
      username: username,
    });
    // res.json({ user: user.purchasedCourses });
    const courses = await Course.find({
      _id: {
        $in: user.purchasedCourses,
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
