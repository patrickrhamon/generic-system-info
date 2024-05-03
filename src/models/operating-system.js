const os = require('node:os');
const { Memory } = require('./memory');

class OperatingSystem {
    constructor () {
        this.cpu = os.cpus()[0]
        this.cpus = os.cpus()
        this.cpusLength = os.cpus().length
        this.freeMemory = new Memory()
        this.totalMemory = new Memory('total')
    }

    updateFreeMemory() {
        this.freeMemory = new Memory()
    }
}

exports.OperatingSystem = OperatingSystem;