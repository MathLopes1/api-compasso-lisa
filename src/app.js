const express = require('express');
require('./infra/database/mongo/index.js');

class App {
    constructor() {
        this.server = express();
    }
}

module.exports = new App().server;
