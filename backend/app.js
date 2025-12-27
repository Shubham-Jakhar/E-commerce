const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();

const rootDir = require('./utils/pathUtils');
const path = require('path');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const DB_PATH = process.env.DATABASE_URL;

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-mocha-one.vercel.app",
  "https://forever-india.vercel.app"
];
app.set("trust proxy", 1);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(rootDir, "public")));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Backend is deployed and running successfully!"
  });
});
app.use("/api", userRouter);
app.use("/admin", adminRouter);


app.use((req, res, next) => {
  res.status(404).send("LOL!   404");
});


const PORT = 3000;
mongoose.connect(DB_PATH).then(() => {
   app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
  });
}).catch(error => {
  console.log("error while connecting mongoose", error);
})

module.exports = app;