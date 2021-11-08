export default class Inventory {
    constructor() {
        this._start = null;
        this._length = 0;
        this._alert = 0;
    }

    add(product) {
        let aux = this._start;
        let find = this._findProduct(product.getCode())
        if(find) {
            return false;
        } else if(this._length === 20) {
            this._alert++;
            return false;
        } else {
            if(this._start === null) {  //Añade al inicio si no hay elementos en la lista.
                this._start = product;
            } else if(product.getCode() < aux.getCode()) { //Añade al inicio si solamente hay un elemento en la lista.
                product._next = aux;
                aux._prev = product;
                this._start = product;
            } else {            
                while(aux._next !== null && product.getCode() > aux.getCode()) {               
                    if(product < aux._next.getCode()) { //Añadir entre dos elementos.
                        product._prev = aux;
                        product._next = aux._next;                    
                        aux._next._prev = product;
                        aux._next = product;  
                    } else {
                        aux = aux._next;
                    }  
                }   

                if(product.getCode() > aux.getCode()) { //Añade el elemento al final de la lista.
                    aux._next = product;
                    product._prev = aux;                    
                } else if(product.getCode() < aux.getCode()) { //Añade el elemento antes del último.                   
                    product._next = aux;
                    product._prev = aux._prev;
                    aux._prev._next = product;
                    aux._prev = product;
                }    
            }
                this._length++;
                return true;  
        }     
    }  
    
    _limitSize() {
        if(this._alert > 0) {
            return true;
        } else {
            return false;
        }
    }

    _findProduct(code) {
        let aux = this._start;
        if(!this._start) {
            return false;
        } else {
            while(aux !== null) {
                if(aux.getCode() === code) {
                    return true;  
                }
                aux = aux._next;
            }
            return false;   
        }    
    }

    delete(code) {
        let dlt = null;  
        let back = this._start._next;
        
        if(!this._start) {
            return null;
        }

        if(this._start.getCode() === code && this._length === 1) { //Si se quiere eliminar el primero y sólo hay un elemento en la lista.
            dlt = this._start;            
            this._start = back;   
            this._length--;
            return dlt;
        } else if(this._start.getCode() === code) { //Si se quiere eliminar el primero de la lista.
            dlt = this._start; 
            dlt._next = null;
            back._prev = null;            
            this._start = back;              
            this._length--;
            return dlt;
        } else {
            let prev = this._start;
            let current = this._start._next;
            while(current !== null) {
                if(current.getCode() === code && current._next === null) { //Si se quiere eliminar el último de la lista.
                    prev._next = null;
                    dlt = current; 
                    dlt._prev = null;
                    this._length--; 
                    return dlt;                  
                } else if(current.getCode() === code) { //Si se quiere eliminar un producto que se encuentra entre otros dos productos.
                    prev._next = current._next;
                    current._next._prev = prev;
                    dlt = current;
                    dlt._next = null;
                    dlt._prev = null;
                    this._length--;   
                    return dlt;
                } else {
                    prev = current;
                    current = current._next;      
                }                
            }     
            return null;
        }
    }

    search(code) {
        if(!this._start) {
            return null;
        }

        let aux = this._start;
        while(aux !== null) {
            if(aux.getCode() === code) {
                return aux;  
            }
            aux = aux._next;
        }
        return null;
    }

    list() {
        let list = '';
        let product = this._start;

        if(!product) {
            list = 'No hay ningún producto registrado.'
            return list;
        } else {
            while(product !== null) {
                list += product.info() + '\n' + '---------------------------------------';
                product = product._next;
            }
            return list;
        }
    }

    reverseList() {
        let list = '';
        let product = this._start;

        if(!product) {
            list = 'No hay ningún producto registrado.'
            return list;
        } else {
            while(product !== null) {
                list = product.info() + '\n' + '---------------------------------------' + list;
                product = product._next;
            }
            return list;
        }   
    }
}