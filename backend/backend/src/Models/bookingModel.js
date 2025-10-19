import a4a from 'mongoose';
const bookingSchema = new a4a['Schema']({
    'property': {
        'type': a4a['Schema']['ObjectId'],
        'ref': 'Property',
        'required': [
            !![],
            'Booking\x20must\x20belong\x20to\x20a\x20Property!'
        ]
    },
    'user': {
        'type': a4a['Schema']['ObjectId'],
        'ref': 'User',
        'required': [
            !![],
            'Booking\x20must\x20belong\x20to\x20a\x20User!'
        ]
    },
    'price': {
        'type': Number,
        'required': [
            !![],
            'Booking\x20must\x20have\x20a\x20price.'
        ]
    },
    'createdAt': {
        'type': Date,
        'default': Date['now']()
    },
    'paid': {
        'type': Boolean,
        'default': !![]
    },
    'fromDate': { 'type': Date },
    'toDate': { 'type': Date },
    'guests': { 'type': Number },
    'numberOfnights': { 'type': Number }
}, { 'timestamps': !![] });
bookingSchema['pre'](/^find/, function (a) {
    this['populate']('user')['populate']({
        'path': 'property',
        'select': 'maximumGuest\x20location\x20images\x20propertyName\x20address'
    }), a();
});
const Booking = a4a['model']('Booking', bookingSchema);
export {
    Booking
};