import Bookings from '../models/bookings';

export default class TicketStorage {
    static Key = "TicketStorage";
    static ticketInstance = null;
    constructor() { }

    static getInstance(){
        if(!TicketStorage.ticketInstance){
            TicketStorage.ticketInstance = new TicketStorage();
        }
        return TicketStorage.ticketInstance;
    }
    
    async getBookingById(bookingId) {
        try {
            let bookingResult = await browser.storage.sync.get(TicketStorage.Key);
            let testKey = Object.keys(bookingResult);
            if (testKey.length > 1) {
                let retBooking = bookingResult.list.find(bk => bk.Id == bookingId);
                return retBooking;
            } else {
                return null;
            }

        } catch (err) {
            console.log(`Error getting bookings : ${err}`);
        }
    }

    async getBookings() {
        try {
            let bookingResult = await browser.storage.sync.get(TicketStorage.Key);
            let testKey = Object.keys(bookingResult);
            if (testKey.length >= 1) {
                let bookings = new Bookings();
                bookingResult[TicketStorage.Key].extArray.forEach(element => {
                    bookings.add(element);
                });
                return bookings.list;
            } else {
                return null;
            }
        } catch (err) {
            console.log('Failed to get bookings');
        }
    }

    async saveBooking(booking) {
        try {
            let bookingResult = await browser.storage.sync.get(TicketStorage.Key);
            let bookingKeys = Object.keys(bookingResult);
            if (bookingKeys.length < 1 || bookingResult.extArray) {
                console.log("booking doesn't exists");
                booking.Id = 1;
                let bookings = new Bookings();
                bookings.add(booking);

                try {
                    let saveBooking = await browser.storage.sync.set({ [TicketStorage.Key]: bookings });
                    console.log('booking saved');
                    return true;
                } catch (err) {
                    console.log('failed to save');
                    return false;
                };
            } else {
                let bookings = new Bookings();

                bookingResult[TicketStorage.Key].extArray.forEach(element => {
                    bookings.add(element);
                });

                if (bookingResult.TicketStorage.extArray !== undefined
                    && bookingResult.TicketStorage.extArray.length === 0) {
                    booking.Id = 1;
                    bookings.add(booking);
                } else {
                    let lastBooking = bookings.list.last();
                    booking.Id = lastBooking.Id + 1;
                    bookings.add(booking);
                }

                let saveBooking = await browser.storage.sync.set({ [TicketStorage.Key]: bookings });
                console.log('new boking add');
                return true;
            }
        } catch (err) {
            console.log("Failed to save booking. Error: " + err);
            throw new Error(err);
        }
    }

    async deleteBookingById(bookingId) {
        try {
            let bookingResult = await browser.storage.sync.get(TicketStorage.Key);
            let testKey = Object.keys(bookingResult);
            if (testKey.length >= 1) {
                let deleteObj = bookingResult[TicketStorage.Key].extArray.find(e => e.Id === bookingId);
                if (deleteObj) {
                    let bookings = new Bookings();
                    bookingResult[TicketStorage.Key].extArray.forEach(element => {
                        if (element.Id !== bookingId)
                            bookings.add(element);
                    });
                    let saveBooking = await browser.storage.sync.set({ [TicketStorage.Key]: bookings });
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            console.log('Failed to delete booking');
        }
    }
}