"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const System_1 = require("./System");
let system = new System_1.System();
const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));
//# sourceMappingURL=index.js.map