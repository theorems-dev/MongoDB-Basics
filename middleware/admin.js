// import { Admin  } from "../db/index.js"; // The wrong way
import models from "../db/index.js";
const { Admin } = models;
// Middleware for handling Auth

async function adminMiddleware(req, res, next) {
  //  Implement Admin Auth Login
  // Need to check the headers to validate the admin from the admin DB.
  const username = req.headers.username;
  const password = req.headers.password;

  //   Admin.findOne({
  //     username: username,
  //     password: password,
  //   }).then((value) => {
  //     if (value) {
  //       next();
  //     } else {
  //       res.status(403).json({ msg: "Admin not found" });
  //     }
  //   });
  try {
    const response = await Admin.findOne({
      username: username,
      password: password,
    });
    if (response) {
      next();
    } else {
      res.status(403).json({ msg: "Admin not found" });
    }
  } catch (error) {
    res.json({ error: "Error fetching data" });
  }
}
export default adminMiddleware;
