const { Velocidade } = require("./velocidade");

class Collection {
    constructor () {
        this.limit = 36
        this.items = []
        this.mediaDownload = 0
        this.mediaUpload = 0
    }

    add(velocidade) {
        if (velocidade instanceof Velocidade) {
            this.checkIfAlreadyLimit()
            this.items.unshift(velocidade)
            this.avgDownload()
            this.avgUpload()
            return
        }
        throw new Error('Parametro não é válido')
    }

    checkIfAlreadyLimit() {
        if (this.items.length === this.limit) {
            this.items.pop()
        }
    }

    avgDownload() {
        var media = 0
        for (var speed of this.items) {
            media += speed.download
        }

        this.mediaDownload = (media / this.items.length).toFixed(2)
    }

    avgUpload() {
        var media = 0
        for (var speed of this.items) {
            media += speed.upload
        }

        this.mediaUpload = (media / this.items.length).toFixed(2)
    }
}

exports.Collection = Collection;