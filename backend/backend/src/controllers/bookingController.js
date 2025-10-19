import { Property } from '../Models/PropertyModel.js';
import { Booking } from '../Models/bookingModel.js';
const createOrder = async (a, b) => {
        const {
                amount: c,
                propertyId: d,
                fromDate: e,
                toDate: f,
                guests: g
            } = a['body'], h = 'order_' + Date['now']();
        b['json']({
            'success': !![],
            'message': 'Order\x20created\x20successfully',
            'orderId': h,
            'amount': c,
            'propertyId': d,
            'fromDate': e,
            'toDate': f,
            'guests': g
        });
    }, verifyPayment = async (a, b) => {
        const {
            orderId: c,
            bookingDetails: d,
            forceStatus: e
        } = a['body'];
        if (e === 'success') {
            const f = 'pay_' + Date['now'](), g = await Booking['create']({
                    'user': a['user']['_id'],
                    'property': d['propertyId'],
                    'price': d['price'],
                    'fromDate': d['fromDate'],
                    'toDate': d['toDate'],
                    'guests': d['guests'],
                    'numberOfNights': d['nights'],
                    'paid': !![]
                }), h = await Property['findByIdAndUpdate'](d['propertyId'], {
                    '$push': {
                        'currentBookings': {
                            'bookingId': g['_id'],
                            'fromDate': d['fromDate'],
                            'toDate': d['toDate'],
                            'userId': a['user']['_id']
                        }
                    }
                }, { 'new': !![] });
            b['json']({
                'success': !![],
                'message': 'Payment\x20successful!\x20Booking\x20confirmed.',
                'paymentId': f,
                'orderId': c,
                'booking': g
            });
        } else
            b['status'](0x190)['json']({
                'success': ![],
                'message': 'Payment\x20failed!\x20Please\x20try\x20again.',
                'orderId': c
            });
    }, getUserBookings = async (a, b) => {
        try {
            const c = await Booking['find']({ 'user': a['user']['_id'] });
            b['status'](0xc8)['json']({
                'status': 'success',
                'data': { 'bookings': c }
            });
        } catch (d) {
            b['status'](0x191)['json']({
                'status': 'fail',
                'message': d['message']
            });
        }
    }, getBookingDetails = async (a, b) => {
        try {
            const c = await Booking['findById'](a['params']['bookingId']);
            b['status'](0xc8)['json']({
                'status': 'success',
                'data': { 'bookings': c }
            });
        } catch (d) {
            b['status'](0x191)['json']({
                'status': 'fail',
                'message': d['message']
            });
        }
    };
export {
    getBookingDetails,
    getUserBookings,
    createOrder,
    verifyPayment
};