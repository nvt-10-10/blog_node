import bodyParser from "body-parser";
import express from "express";
import router from "./router/index.js";
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:8080",
    })
);

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
