import ExtendedArray from './extended_array';
import Booking from './booking';

export default class Bookings {
    constructor() {
        // if(this.extArray)
        this.extArray = new ExtendedArray();
    }

    add(booking) {
        if (booking)
            this.extArray.add(booking);
    }

    get list() {
        return this.extArray;
    }

}