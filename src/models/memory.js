const os = require('node:os');

class Memory {
    constructor (type = 'free') {
        if (type === 'free') {
            this.reference = this.getReference()
            this.byte = this.getFreeByte().toFixed(1) + ' B'
            this.kilo = this.getFreeKilobyte().toFixed(1) + ' KB'
            this.mega = this.getFreeMegabyte().toFixed(1) + ' MB'
            this.giga = this.getFreeGigabyte().toFixed(1) + ' GB'
        }

        if (type === 'total') {
            this.reference = this.getReferenceTotal()
            this.byte = this.getTotalByte().toFixed(1) + ' B'
            this.kilo = this.getTotalKilobyte().toFixed(1) + ' KB'
            this.mega = this.getTotalMegabyte().toFixed(1) + ' MB'
            this.giga = this.getTotalGigabyte().toFixed(1) + ' GB'
        }
    }

    getReference() {
        return os.freemem()
    }

    getFreeByte() {
        return this.getReference()
    }

    getFreeKilobyte() {
        return this.getFreeByte() / 1024
    }

    getFreeMegabyte() {
        return this.getFreeKilobyte() / 1024
    }

    getFreeGigabyte() {
        return this.getFreeMegabyte() / 1024
    }

    getReferenceTotal() {
        return os.totalmem()
    }

    getTotalByte() {
        return this.getReferenceTotal()
    }

    getTotalKilobyte() {
        return this.getTotalByte() / 1024
    }

    getTotalMegabyte() {
        return this.getTotalKilobyte() / 1024
    }

    getTotalGigabyte() {
        return this.getTotalMegabyte() / 1024
    }
}

exports.Memory = Memory