// Express app setup placeholder
import authRoutes from "./modules/auth/auth.routes.js";

const express = require('express');
const app = express();


app.use(express.json());
app.use("/api/auth", authRoutes);





module.exports = app;
