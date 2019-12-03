const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    nit: String,
    name: String,
    tipo: String,
    nameDevice: String,
    code: String,
    serialDevice: String,
    brand: String,
    model: String,
    processor: String,
    ram: String,
    hdd: String,
    os: String,
    monitor: String,
    serialBattery: String,
    serialCargador: String,
    accessories: String,    
    serialMouse: String,    
    serialKeyboard: String,
    tipoDevice: String,
    details: String,

    status: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('device', DeviceSchema);

