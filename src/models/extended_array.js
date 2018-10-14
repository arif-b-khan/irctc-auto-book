export default class ExtendedArray extends Array {
    constructor() {
        super([]);
        this.pop();
    }

    first() {
        if (this.length < -1) {
            return null;
        }
        let { 0: first } = this;
        return first;
    }

    last() {
        if (this.length < -1) {
            return null;
        }
        let { [this.length - 1]: last } = this;
        return last;
    }

    add(item) {
        if (item) {
            this.push(item);        
        }
        else {
           throw new Error("Object is null or empty");
        }
    }
}
