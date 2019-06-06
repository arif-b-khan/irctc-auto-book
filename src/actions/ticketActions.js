import * as types from './actionTypes';
import TicketStorage from '../db/ticket-storage';


export function loadTicketSuccess(tickets){
    return {
        type: types.LOAD_TICKETS
        ,tickets
    }
}


export function loadTickets(){
    return function(dispatch){
        let bookingList = TicketStorage.getInstance().getBookings();
        return bookingList.then((bk) => {
          dispatch(loadTicketSuccess(bk));
        }, (err) => {
            throw(err);
        });
    }
}