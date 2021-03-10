module.exports = {
    createSeats,
    delSeats
}

let Seat = require("../models/ticket")
let Flight = require("../models/flight")

async function createSeats(req, res) {
    let newSeat = await Flight.findById(req.params.id)
    await Seat.create({
        seat: req.body.seat,
        price: req.body.price,
        flight: newSeat.id,
    })
    res.redirect("/show")
}
async function delSeats(req, res) {
    try {
        let x = await Seat.findById(req.params.id)
        await x.remove()
        x.save()
        res.render("flights")
    } catch (err) {
        console.log(err)
        res.send("error")
    } 
}
