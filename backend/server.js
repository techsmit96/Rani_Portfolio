const path = require("path");
const dotenv = require("dotenv");
const app = require("./app");
const cloudinary = require("cloudinary");

dotenv.config({ path: path.resolve(__dirname, "./config.env") });
require("./config/database");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  apisecret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
