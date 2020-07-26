const express = require("express");
const path = require("path");
const logger = require("./logger")
const static = require("express-static-gzip");
const PORT = process.env.PORT || 3000;
const app = express();



app.use(logger);
app.use(static(path.join(__dirname, "..", "dist")));


app.listen(PORT, () => console.log(`Server up on port=${PORT}`));