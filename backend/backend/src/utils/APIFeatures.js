class APIFeatures {
    constructor(a, b) {
        this['query'] = a, this['queryString'] = b;
    }
    ['filter']() {
        let a = {}, b = { ...this['queryString'] };
        b['minPrice'] && b['maxPrice'] && (b['maxPrice']['includes']('>') ? a['price'] = { '$gte': b['minPrice'] } : a['price'] = {
            '$gte': b['minPrice'],
            '$lte': b['maxPrice']
        });
        if (b['propertyType']) {
            let c = b['propertyType']['split'](',')['map'](d => d['trim']());
            a['propertyType'] = { '$in': c };
        }
        b['roomType'] && (a['roomType'] = b['roomType']);
        if (b['amenities']) {
            const d = Array['isArray'](b['amenities']) ? b['amenities'] : [b['amenities']];
            a['amenities.name'] = { '$all': d };
        }
        return this['query'] = this['query']['find'](a), this;
    }
    ['search']() {
        let a = {}, b = { ...this['queryString'] };
        return a = b['city'] ? {
            '$or': [
                { 'address.city': b['city']['toLowerCase']()['replaceAll']('\x20', '') },
                { 'address.state': b['city']['toLowerCase']()['replaceAll']('\x20', '') },
                { 'address.area': b['city']['toLowerCase']()['replaceAll']('\x20', '') }
            ]
        } : {}, b['guests'] && (a['maximumGuest'] = { '$gte': b['guests'] }, b['guests']), b['dateIn'] && b['dateOut'] && (a['$and'] = [{
                'currentBookings': {
                    '$not': {
                        '$elemMatch': {
                            '$or': [
                                {
                                    'fromDate': { '$lt': b['dateOut'] },
                                    'toDate': { '$gt': b['dateIn'] }
                                },
                                {
                                    'fromDate': { '$lt': b['dateIn'] },
                                    'toDate': { '$gt': b['dateIn'] }
                                }
                            ]
                        }
                    }
                }
            }]), this['query'] = this['query']['find'](a), this;
    }
    ['paginate']() {
        let a = this['queryString']['page'] * 0x1 || 0x1, b = this['queryString']['limit'] * 0x1 || 0xc, c = (a - 0x1) * b;
        return this['query'] = this['query']['skip'](c)['limit'](b), this;
    }
}
export {
    APIFeatures
};