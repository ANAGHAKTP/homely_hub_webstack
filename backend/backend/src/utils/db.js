import a11a from 'mongoose';
const connectDB = async () => {
    try {
        await a11a['connect'](process['env']['MONGO_URI']), console['log']('Mongodb\x20connected...');
    } catch (a) {
        console['error']('Mongodv\x20connection\x20failed', a), process['exit'](0x1);
    }
};
export default connectDB;