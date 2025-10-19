import React from "react";
import { DatePicker, Space } from "antd";
import { Link } from "react-router-dom";

const PaymentForm = () => {
  const { RangePicker } = DatePicker;

  return (
    <div className="form-container">
      <form className="payment-form">
        <div className="price-pernight">
          Price: <b>&#8377;2000</b>
          <span> / Per night</span>
        </div>

        <div className="payment-field">
          {/* Date Range */}
          <div className="date">
            <Space direction="vertical" size={12}>
              <RangePicker format="YYYY-MM-DD" picker="date" />
            </Space>
          </div>

          {/* Guests */}
          <div className="guest">
            <label className="payment-labels">Number of guests:</label>
            <br />
            <input
              type="number"
              className="no-of-guest"
              placeholder="Guest"
              defaultValue="2"
            />
          </div>

          {/* Name + Phone */}
          <div className="name-phoneno">
            <label className="payment-labels">Your full name:</label>
            <br />
            <input
              type="text"
              className="full-name"
              placeholder="Name"
              defaultValue="John Doe"
            />
            <br />
            <label className="payment-labels">Phone Number:</label>
            <br />
            <input
              type="number"
              className="phone-number"
              placeholder="Number"
              defaultValue="9876543210"
            />
          </div>
        </div>

        {/* Book Button */}
        <div className="book-place">
          <button>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Login to Book
            </Link>
          </button>
          {/* Example booked state */}
          {/* <button>Book this place &#8377; 4000</button> */}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
