// import { User } from "../db/index.js"; // The Wrong way
import models from "../db/index.js";
const { User } = models;
// Middleware for handling Auth

async function userMiddleware(req, res, next) {
  //  Implement User Auth Login
  // Need to check the headers to validate the user from the users DB.
  const username = req.headers.username;
  const password = req.headers.password;
  //   User.findOne({
  //     username: username,
  //     password: password,
  //   }).then((value) => {
  //     if (value) {
  //       next();
  //     } else {
  //       res.status(403).json({ msg: "User not found" });
  //     }
  //   });
  try {
    const response = await User.findOne({
      username: username,
      password: password,
    });
    if (response) {
      next();
    } else {
      res.status(403).json({ msg: "User not found" });
    }
  } catch (error) {
    res.json({ error: "Error fetching data" });
  }
}
export default userMiddleware;
