import express from "express";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
