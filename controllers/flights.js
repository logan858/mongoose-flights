module.exports = {
    indexP,
    getFlightsPage,
    addFlightsPage,
    create,
}

let Flight = require("../models/flight");

function indexP(req, res) {
    res.render("flights")
}
function getFlightsPage(req, res) {
    Flight.find({}, function (err, x) {
        if(err) {
            res.send("something went wrong")
        } 
        res.render("show", {flights: x});
    })
}
   
function addFlightsPage(req, res) {
    res.render("update")
}

async function create(req, res) {
    for (let x in req.body) {
        if (req.body[x] === '') delete req.body[x];
      }
    await Flight.create({
        airline: req.body.airline,
        airport: req.body.airport,
        flightNo: req.body.flightNum,
        departs: req.body.date
    })
    res.render("flights")
}