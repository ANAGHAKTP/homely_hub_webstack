import React, { useEffect, useState } from "react";
import "../../css/Payment.css";
import {
  initiateCheckoutSession,
  verifyPayment,
} from "../../store/Payment/payment-action";
import {
  selectPaymentDetails,
  selectPaymentStatus,
  paymentActions,
} from "../../store/Payment/payment-slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [showPaymentGateaway, setShowPaymentGateaway] = useState(false);

  // const { isAuthenticated, user } = useSelector((state) => state.user);

  const {
    checkinDate,
    checkoutDate,
    totalPrice,
    propertyName,
    guests,
    nights,
  } = useSelector(selectPaymentDetails);

  const { loading, error, orderData } = useSelector(selectPaymentStatus);

  const handleBooking = async () => {
    const paymentData = {
      amount: totalPrice,
      propertyId,
      fromDate: checkinDate,
      toDate: checkoutDate,
      guests,
    };
    try {
      // Step 1: Create Order
      await dispatch(initiateCheckoutSession(paymentData));
    } catch (error) {
      toast.error("Payment initiation failed");
    }
  };
  const handleConfirmPayment = async () => {
    try {
      await dispatch(
        verifyPayment({
          orderId: orderData.orderId,
          bookingDetails: {
            propertyId,
            fromDate: checkinDate,
            toDate: checkoutDate,
            guests,
            price: totalPrice,
          },
          forceStatus: "success",
        })
      );

      toast.success("🎉 Payment Successful! Booking Confirmed!");
      setTimeout(() => navigate("/user/mybookings"), 1000);
      dispatch(paymentActions.resetPayment());
    } catch (error) {
      toast.error("Payment failed!");
    }
  };

  const handleCancelPayment = () => {
    toast.error("Payment Cancelled");
    navigate(`/propertylist/${propertyId}`);
  };
  useEffect(() => {
    if (orderData && !showPaymentGateaway) {
      setShowPaymentGateaway(true);
    }
  }, [orderData]);
  if (showPaymentGateaway && orderData) {
    return (
      <div className="payment-gateway-overlay">
        <div className="payment-gateway-modal">
          {/* Header */}
          <div className="gateway-header">
            <div className="gateway-logo">
              <h2>🏠 HomelyHub</h2>
              <span>Payment Gateway</span>
            </div>
            <div className="secure-badge">
              <span>🔒 Secure Payment</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="gateway-content">
            <div className="merchant-info">
              <h3>
                Payment to: <strong>HomelyHub</strong>
              </h3>
              <p>
                Order ID: <strong>{orderData.orderId}</strong>
              </p>
            </div>

            <div className="payment-summary">
              <div className="summary-item">
                <span>Property:</span>
                <span>{propertyName}</span>
              </div>
              <div className="summary-item">
                <span>Check-in:</span>
                <span>{checkinDate}</span>
              </div>
              <div className="summary-item">
                <span>Check-out:</span>
                <span>{checkoutDate}</span>
              </div>
              <div className="summary-item">
                <span>Guests:</span>
                <span>{guests}</span>
              </div>
              <div className="summary-item">
                <span>Nights:</span>
                <span>{nights}</span>
              </div>
              <div className="summary-item total-amount">
                <span>
                  <strong>Total Amount:</strong>
                </span>
                <span>
                  <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                </span>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Action Buttons */}
            <div className="gateway-actions">
              <button
                onClick={handleCancelPayment}
                className="cancel-btn"
                disabled={loading}
              >
                Cancel Payment
              </button>
              <button
                onClick={handleConfirmPayment}
                className="confirm-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    Confirm Payment ₹{totalPrice.toLocaleString("en-IN")}
                  </>
                )}
              </button>
            </div>

            {/* Security Info */}
            <div className="security-info">
              <p>
                <span>🛡️</span>
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Complete Your Booking</h1>
        <p>{propertyName}</p>
      </div>

      <div className="payment-content">
        {/* Booking Summary */}
        <div className="booking-summary-card">
          <h3>Booking Details</h3>
          <div className="detail-row">
            <span>Check-in:</span>
            <span>{checkinDate}</span>
          </div>
          <div className="detail-row">
            <span>Check-out:</span>
            <span>{checkoutDate}</span>
          </div>
          <div className="detail-row">
            <span>Guests:</span>
            <span>{guests}</span>
          </div>
          <div className="detail-row">
            <span>Nights:</span>
            <span>{nights}</span>
          </div>
          <div className="detail-row total-row">
            <strong>Total Amount:</strong>
            <strong>₹{totalPrice}</strong>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Initial Book Now Button */}
        <div className="payment-action">
          <button
            onClick={handleBooking}
            disabled={loading}
            className="book-now-btn"
          >
            {loading ? "Processing..." : `Proceed to Payment ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
