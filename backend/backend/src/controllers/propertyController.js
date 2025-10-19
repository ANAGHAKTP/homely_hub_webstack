import { Property } from '../Models/PropertyModel.js';
import { APIFeatures } from '../utils/APIFeatures.js';
import a2a from '../utils/ImagekitIO.js';
const getProperty = async (a, b) => {
        try {
            const c = await Property['findById'](a['params']['id']);
            b['status'](0xc8)['json']({
                'status': 'success',
                'data': c
            });
        } catch (d) {
            b['status'](0x194)['json']({
                'status': 'fail',
                'message': d['message']
            });
        }
    }, createProperty = async (a, b) => {
        try {
            const {
                    propertyName: c,
                    description: d,
                    propertyType: e,
                    roomType: f,
                    extraInfo: g,
                    address: h,
                    amenities: i,
                    checkInTime: j,
                    checkOutTime: k,
                    maximumGuest: l,
                    price: m,
                    images: n
                } = a['body'], o = [];
            for (const q of n) {
                const r = await a2a['upload']({
                    'file': q['url'],
                    'fileName': 'property_' + Date['now']() + '.jpg',
                    'folder': 'property_images'
                });
                o['push']({
                    'url': r['url'],
                    'public_id': r['fileId']
                });
            }
            const p = await Property['create']({
                'propertyName': c,
                'description': d,
                'propertyType': e,
                'roomType': f,
                'extraInfo': g,
                'address': h,
                'amenities': i,
                'checkInTime': j,
                'checkOutTime': k,
                'maximumGuest': l,
                'price': m,
                'images': o,
                'userId': a['user']['id']
            });
            b['status'](0xc8)['json']({
                'status': 'success',
                'data': { 'data': p }
            });
        } catch (s) {
            console['error']('Error\x20searching\x20properties', s), b['status'](0x194)['json']({
                'meesage': 'fail',
                'error': 'Internal\x20server\x20error'
            });
        }
    }, getProperties = async (a, b) => {
        try {
            const c = new APIFeatures(Property['find'](), a['query'])['filter']()['search']()['paginate'](), d = await Property['find'](), e = await c['query'];
            b['status'](0xc8)['json']({
                'staus': 'success',
                'no_of_responses': e['length'],
                'all_properties': d['length'],
                'data': e
            });
        } catch (f) {
            console['error']('Error\x20searching\x20properties:\x20', f), b['status'](0x1f4)['json']({ 'error': 'Internal\x20server\x20Error' });
        }
    }, getUsersProperties = async (a, b) => {
        try {
            const c = a['user']['_id'], d = await Property['find']({ 'userId': c });
            b['status'](0xc8)['json']({
                'status': 'success',
                'data': d
            });
        } catch (e) {
            b['status'](0x194)['json']({
                'status': 'fail',
                'message': e['message']
            });
        }
    };
export {
    getProperty,
    createProperty,
    getProperties,
    getUsersProperties
};