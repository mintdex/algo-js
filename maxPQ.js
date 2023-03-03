export class MaxPQ {
    constructor() {
        // Heap binary structure where start at index 1 which will be root,
        // Childs will be at index 2*k and 2*k + 1
        this.pq = []; 
        this.N = 0;
    }

    max() {
        return this.pq[1];
    }

    // Increase array size and add to the back of the array.
    // You may need to handle resize() the array before adding if 
    // you are using static array
    insert(val) {
        this.pq[++this.N] = val;
        // Move the item up till it's in right place (smaller than the parent and bigger than the child nodes). 
        this.swim(this.N);
    }

    delMax() {
        if (this.isEmpty()) {
            console.log('PQ underflow');
            return;
        }
        const max = this.pq[1];
        this.exch(1, this.N);
        this.pq[this.N--] = undefined; // prevent memory leaks
        this.sink(1);
        return max;
    }

    // Move the item at idx k up if it's still bigger than the parent
    swim(k) {
        while (k > 1 && this.less(k / 2, k)) {
            this.exch(k, k / 2);
            k = k / 2;
        }
    }

    sink(k) {
        while (2 * k <= this.N) {
            let j = k * 2;
            if (j < this.N && this.less(j, j + 1)) j++;
            if (!this.less(k, j)) break;
            this.exch(k, j);
            k = j;
        }
    }

    size() {
        return this.N;
    }

    isEmpty() {
        return this.N === 0;
    }

    exch(i, j) {
        const t = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = t;
    }

    less(i, j) {
        return this.pq[i] < this.pq[j];
    }
}