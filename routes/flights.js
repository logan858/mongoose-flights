const express = require("express")
const router = express.Router();
const flightsCtrl = require("../controllers/flights")

router.get("/", flightsCtrl.indexP)

router.get("/update", flightsCtrl.addFlightsPage)

router.get("/show", flightsCtrl.getFlightsPage)
router.get("/show/:id", flightsCtrl.addDestinationsPage)
router.post("/destinations/:id", flightsCtrl.addDestinations)
router.post("/destinations/del/:id", flightsCtrl.delDestinations)

router.post("/update", flightsCtrl.create)
module.exports = router;