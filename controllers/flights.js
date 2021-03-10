module.exports = {
    indexP,
    getFlightsPage,
    addFlightsPage,
    create,
    addDestinationsPage,
    addDestinations,
    delDestinations,
}

let Flight = require("../models/flight");
let Seat = require("../models/ticket");

function indexP(req, res) {
    res.render("flights")
}
function getFlightsPage(req, res) {
    Flight.find({}, function (err, x) {
        if(err) {
            res.send("something went wrong")
        } 
        res.render("posts", {flights: x});
    })
}  

function addFlightsPage(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render("update", {departsDate})
}

async function addDestinationsPage(req, res) {
    let seats = await Seat.find({flight: req.params.id})
    await Flight.find({_id: req.params.id}, function(err, x) {
        res.render("destinations", {
            flight: x,
            seats: seats,
        })
    })
}
async function addDestinations(req, res) {
    try {
        let foundFlight = await Flight.findById(req.params.id)
        let flightObj =  {
            airport: req.body.airport,
            arrival: req.body.date,
        }
        foundFlight.destinations.push(flightObj)
        await foundFlight.save()
        res.redirect("/show")
    } catch (err) {
        return res.send("There was an error")
    }
};
function delDestinations(req, res) {
    Flight.find({"destinations._id": req.params.id}, async function(err, dests) {
        try {
            console.log(dests)
            dests[0].destinations.id(req.params.id).remove()
            await dests[0].save()
            res.redirect("/show")
        } catch (err) {
            console.log(err)
            return res.send("error")
        }
    })
}
async function create(req, res) {
    for (let x in req.body) {
        if (req.body[x] === '') delete req.body[x];
      }
    // try {
        await Flight.create({
            airline: req.body.airline,
            airport: req.body.airport,
            flightNo: req.body.flightNum,
            departs: req.body.date
        })
    // } catch (err) {
    //     console.log(err)
    //     return res.send("there was an error")
    // }
    res.render("flights")
}