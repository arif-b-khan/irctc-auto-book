import React from 'react';
import ReactDOM from 'react-dom';
import UserDetail from './models/userDetail';
import BookingList  from './components/booking-list';
import TicketStorage from './db/ticket-storage';
import Booking from './models/booking';
import ExtendedArray from './models/extended_array';

class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.ticketStorage = new TicketStorage();
    // Get the active tab and store it in component state.

    this.state = {
      UserInfo: new UserDetail("", ""),
      Booking_List: null
    };
  }

  componentDidMount() {
    console.log("calling get bookings");
    this.getBookings();
  }

  handlerClearState = () => {
    browser.storage.sync.remove(Popup.OBJECT_KEY);
    this.setState({ UserInfo: new UserDetail("", "") });
  }

  handlerUsernameChange = (event) => {
    let { UserInfo: userInfo } = this.state;
    userInfo.username = event.target.value;
    this.setState({ UserInfo: userInfo });
  }

  handlerPasswordChange = (event) => {
    let { UserInfo: userInfo } = this.state;
    userInfo.password = event.target.value;
    this.setState({ UserInfo: userInfo });
  }

  handleLoginAdd = async (username, password) => {
    let booking = new Booking(0, new UserDetail(username, password));
    try {
      console.log("calling save booking");
      let result = await this.ticketStorage.saveBooking(booking);
      console.log("called save booking");
      this.getBookings();
    } catch (err) {
      console.log(err);
    }

    // console.log(result);
  }

  getBookings() {
    let bookingList = this.ticketStorage.getBookings();
    bookingList.then((bk) => {
      this.setState((prevBookings, props) => ({BookingList: bk}));
    });
  }

  deleteBookingById = (bookingId) => {
   this.ticketStorage.deleteBookingById(bookingId).then(result => {
     if(result){
       this.getBookings();
     }
   })
  }

  render() {
    // let bookingList = this.ticketStorage.getBookings();
    let { UserInfo, BookingList: Booking_List } = this.state;
     
    return (
      <div>
        <h1>Bookings</h1>
        <BookingList bookings={Booking_List} deleteHandler={this.deleteBookingById}></BookingList>
        <label>User Name</label>
        <input type="text" value={UserInfo.username} onChange={this.handlerUsernameChange} />
        <label>Password</label>
        <input type="password" value={UserInfo.password} onChange={this.handlerPasswordChange} />
        <button onClick={() => this.handleLoginAdd(UserInfo.username, UserInfo.password)}>Add</button>
        <button onClick={() => this.handlerClearState()}>Clear</button>
        <span>{UserInfo.username}</span>
      </div>
    );
  }
}

ReactDOM.render(<Popup />, document.getElementById('app'));
