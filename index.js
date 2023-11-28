import express from "express";
import cors from "cors";
import BeritaRoute from "./routes/BeritaRoute.js";
import FileUpload from "express-fileupload";
import Route from "./routes/Route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(FileUpload());
// supaya bisa mengakses public static untuk gambar
app.use(express.static("public"));
app.use(Route);

app.listen(5000, () => console.log("Server up and running ..."));
