const { Velocidade } = require("./velocidade");

class Collection {
    limit = 36;
    items = []

    add(velocidade) {
        if (velocidade instanceof Velocidade) {
            this.checkIfAlreadyLimit()
            this.items.unshift(velocidade)
            return
        }
        throw new Error('Parametro não é válido')
    }

    checkIfAlreadyLimit() {
        if (this.items.length === this.limit) {
            this.items.pop()
        }
    }
}

exports.Collection = Collection;