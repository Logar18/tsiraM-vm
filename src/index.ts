import { System } from "./System";

const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json()); 

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));

