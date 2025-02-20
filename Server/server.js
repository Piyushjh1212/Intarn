import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Config/connectDb.js";
import seedRouter from "./Routers/seedRouter.js";

const app = express();

dotenv.config();

const port = process.env.PORT;
const mongo_url = process.env.MONGODB_URL;


app.use(express.json());
app.use(cors());

connectDb(mongo_url);


// Api endpoints

app.use('/api/v1/seed-data', seedRouter);

 app.get("/", (req, res) => {
  return res.status(201).json({
   success: true,
     message: `Server running on port : ${port}.`,
  });
 });


app.listen(port, () => {
  console.log(`Server running on : ${port} this port`);
});
