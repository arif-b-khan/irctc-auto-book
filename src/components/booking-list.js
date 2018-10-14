import React, { Component, Fragment } from 'react';

export default class BookingList extends Component {
    constructor(props){
        super(props);
    }

    getBookingList = (bookings, deleteHandler) => {
        if(bookings != undefined){
            return bookings.map((bk) => {
            
            return (<li>
                <span>{bk.Id}</span> 
                <span>{bk.UserDetail.username}</span> 
                <button onClick={() => deleteHandler(bk.Id)}>x</button>
            </li>);
            });
        }
        else{
            return (<li>No element found</li>);
        }
    }

    deleteBookingById = (bookingId) => {
        
    }

    render() {
        return (
            <Fragment>
                <ul>
                   {this.getBookingList(this.props.bookings, this.props.deleteHandler)}
                </ul>
            </Fragment>
        );
    }
}
