import a5a from 'mongoose';
import a5b from 'slugify';
const propertySchema = new a5a['Schema']({
    'propertyName': {
        'type': String,
        'required': [
            !![],
            'Please\x20enter\x20your\x20property\x20name'
        ]
    },
    'description': {
        'type': String,
        'required': [
            !![],
            'Please\x20add\x20information\x20about\x20your\x20property'
        ]
    },
    'extraInfo': {
        'type': String,
        'default': 'Nestled\x20in\x20a\x20tranquil\x20neighborhood,\x20the\x20house\x20exudes\x20an\x20aura\x20of\x20charm\x20and\x20elegance.\x20The\x20exterior\x20is\x20adorned\x20with\x20a\x20harmonious\x20blend\x20of\x20classic\x20and\x20contemporary\x20architectural\x20elements,\x20featuring\x20a\x20beautiful\x20brick\x20facade\x20and\x20a\x20welcoming\x20front\x20porch.As\x20you\x20step\x20inside,\x20you\x20are\x20greeted\x20by\x20a\x20spacious,\x20sunlit\x20living\x20room\x20with\x20high\x20ceilings\x20and\x20large\x20windows\x20that\x20invite\x20an\x20abundance\x20of\x20natural\x20light.\x20The\x20hardwood\x20floors\x20add\x20a\x20touch\x20of\x20warmth\x20to\x20the\x20space,\x20complementing\x20the\x20neutral\x20color\x20palette.The\x20kitchen\x20is\x20a\x20chef\x27s\x20dream,\x20equipped\x20with\x20modern\x20appliances,\x20sleek\x20countertops,\x20and\x20ample\x20storage\x20space.\x20It\x20opens\x20up\x20to\x20a\x20cozy\x20dining\x20area,\x20creating\x20a\x20perfect\x20setting\x20for\x20family\x20meals\x20and\x20gatherings.'
    },
    'propertyType': {
        'type': String,
        'enum': [
            'House',
            'Flat',
            'Guest\x20House',
            'Hotel'
        ],
        'default': 'House'
    },
    'roomType': {
        'type': String,
        'enum': [
            'Anytype',
            'Room',
            'Entire\x20Home'
        ],
        'default': 'Anytype'
    },
    'maximumGuest': {
        'type': Number,
        'required': [
            !![],
            'Please\x20give\x20the\x20maximum\x20no\x20of\x20Guest\x20that\x20can\x20occupy'
        ]
    },
    'amenities': [{
            'name': {
                'type': String,
                'required': !![],
                'enum': [
                    'Wifi',
                    'Kitchen',
                    'Ac',
                    'Washing\x20Machine',
                    'Tv',
                    'Pool',
                    'Free\x20Parking'
                ]
            },
            'icon': {
                'type': String,
                'required': !![]
            }
        }],
    'images': {
        'type': [{
                'public_id': { 'type': String },
                'url': {
                    'type': String,
                    'required': !![]
                }
            }],
        'validate': {
            'validator': function (a) {
                return a['length'] >= 0x6;
            },
            'message': 'The\x20images\x20array\x20must\x20contain\x20at\x20least\x205\x20images.'
        }
    },
    'price': {
        'type': Number,
        'required': [
            !![],
            'Please\x20enter\x20the\x20Price\x20per\x20night\x20value'
        ],
        'default': 0x1f4
    },
    'address': {
        'area': String,
        'city': String,
        'state': String,
        'pincode': Number
    },
    'currentBookings': [{
            'bookingId': {
                'type': a5a['Schema']['Types']['ObjectId'],
                'ref': 'Booking'
            },
            'fromDate': Date,
            'toDate': Date,
            'userId': {
                'type': a5a['Schema']['Types']['ObjectId'],
                'ref': 'User'
            }
        }],
    'userId': {
        'type': a5a['Schema']['Types']['ObjectId'],
        'ref': 'User'
    },
    'slug': String,
    'chekInTime': {
        'type': String,
        'default': '11:00'
    },
    'chekOutTime': {
        'type': String,
        'default': '13:00'
    }
});
propertySchema['pre']('save', function (a) {
    this['slug'] = a5b(this['propertyName'], { 'lower': !![] }), a();
}), propertySchema['pre']('save', function (a) {
    this['address']['city'] = this['address']['city']['toLowerCase']()['replaceAll']('\x20', ''), a();
});
const Property = a5a['model']('Property', propertySchema);
export {
    Property
};