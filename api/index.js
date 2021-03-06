import express from "express";
const app = express();
import { Users } from "./users.js";
import cors from "cors";

app.use(cors());

app.get("/", (req, res) => {
  const { q } = req.query;

  const keys = ["first_name", "last_name", "email"];

  const search = (data) => {
      return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(q))
      );
    };

    q ? res.json(search(Users).slice(0, 40)) : res.json(Users.slice(0, 40));

});


app.listen(5500, () => console.log("Our beautiful API is working!"));