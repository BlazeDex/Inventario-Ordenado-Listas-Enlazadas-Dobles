export default class Product {
    constructor(code, name, amount, cost) {
        this._code = code;
        this._name = name;
        this._amount = amount;
        this._cost = cost;
        this._next = null; 
        this._prev = null;
    }

    getCode() {
        return this._code;
    }

    getName() {
        return this._name.toUpperCase();
    }

    getAmount() {
        return this._amount;
    }

    getCost() {
        return this._cost;
    }

    getTotal() {
        return this._amount * this._cost;
    }   

    info() {
        return `<div>
                    <p>Código: ${this.getCode()}</p>
                    <p>Nombre: ${this.getName()}</p>
                    <p>Cantidad: ${this.getAmount()}</p>
                    <p>Costo Individual: $${this.getCost()}</p>
                    <p>Costo Total: $${this.getTotal()}</p>
                </div>`;
    }  
}