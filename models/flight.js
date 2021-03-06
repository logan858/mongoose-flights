const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let curDate = new Date()
const flightSchema = new Schema({
    airline: { 
        type: String, 
        enum: ["American", "Southwest", "United"],
    },
    airport: {
        type: String, 
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        default:"DEN",
    },
    flightNo: {
        type: Number, 
        min: 10, max: 9999,
    },
    departs: {
        type: Date, 
        default: curDate.setFullYear(curDate.getFullYear() + 1),
    }
})

module.exports = mongoose.model("Flight", flightSchema)