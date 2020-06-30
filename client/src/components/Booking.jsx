import React from 'react';
import axios from 'axios';
import moment from 'moment';

import BookingCalendar from './BookingCalendar.jsx';
import Price from './Price.jsx';
import Review from './Review.jsx';
import Guests from './Guests.jsx';

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: '',
      price: 0,
      guests: {
        total: 1,
        adults: 1,
        children: 0,
        infants: 0,
      },
      review: '',
      availDates: [],
      checkInDate: '',
      checkOutDate: '',
      currentDate: moment(new Date()),
    };
    this.guestsAndPriceInfoHandler = this.guestsAndPriceInfoHandler.bind(this);
    this.checkInOutDatesHandler = this.checkInOutDatesHandler.bind(this);
  }

  componentDidMount() {
    this.fetchDatesForSelectedListingID();
  }

  guestsAndPriceInfoHandler(adults, children, infants) {
    this.setState({
      guests: {
        total: adults + children + infants,
        adults,
        children,
        infants,
      },
      price: this.state.pricePerNight * (adults + children / 2),
    });
  }

  checkInOutDatesHandler(checkInDate, checkOutDate) {
    console.log(checkInDate, checkOutDate);
    this.setState({
      checkInDate,
      checkOutDate,
    });
  }

  fetchDatesForSelectedListingID() {
    const { listingID } = this.props;
    return axios.get(`/api/reservation/${listingID}`)
      .then(({ data }) => {
        console.log('GET Request Successful From booking: ', data);
        this.setState({
          pricePerNight: data.price,
          review: data.review,
          availDates: data.open_dates,
        });
      })
      .catch((err) => {
        console.log('Error Fetching Data: ', err);
      });
  }

  sendReservationInfo() {
    axios.post(`/api/${listingID}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="sticky-box">
        <div className="sticky-box-static-top">
          <div className="price">
            <Price price={this.state.price} />
          </div>
          <div className="review">
            <Review review={this.state.review} />
          </div>
        </div>
        <div className="sticky-box-clickable-boxes">
          <div className="sticky-box-calendars">
            <BookingCalendar
              availDates={this.state.availDates}
              currentDate={this.state.currentDate}
              checkInOutDatesHandler={this.checkInOutDatesHandler}
            />
          </div>

          <div className="sticky-box-guests">
            <Guests guestsAndPriceInfoHandler={this.guestsAndPriceInfoHandler} />
          </div>
        </div>

        <div className="sticky-box-availability-btn-container">
          <button className="sticky-box-availability-btn">Check Availability</button>
        </div>
      </div>
    );
  }
}

export default Booking;
