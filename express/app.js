import express from "express";
import path from "path";
import workingHours from "./middleware/workingHours.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Apply working-hours middleware to all page routes
app.use(workingHours);

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/services", (req, res) => {
  res.render("services", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// 404
app.use((req, res) => {
  res.status(404).render("index", { title: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
