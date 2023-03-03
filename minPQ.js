export class MinPQ {
    constructor() {
        this.pq = [];
        this.N = 0;
    }

    min() {
        return this.pq[1];
    }

    insert(val) {
        this.pq[++this.N] = val;
        this.swim(this.N);
    }

    delMin() {
        if (this.isEmpty()) {
            console.log('PQ underflow');
            return;
        }
        const min = this.pq[1];
        this.exch(1, this.N);
        this.pq[this.N--] = undefined;
        this.sink(1);
        return min;
    }

    swim(k) {
        while (k > 1 && this.less(k, Math.floor(k / 2))) {
            this.exch(k, Math.floor(k / 2));
            k = Math.floor(k / 2);
        }
    }

    sink(k) {
        while (2 * k <= this.N) {
            let j = k * 2;
            if (j < this.N && this.less(j + 1, j)) j++;
            if (!this.less(j, k)) break;
            this.exch(j, k);
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