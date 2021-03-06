const express = require("express")
const router = express.Router();
const flightsCtrl = require("../controllers/flights")

router.get("/", flightsCtrl.indexP)
router.get("/show", flightsCtrl.getFlightsPage)
router.get("/update", flightsCtrl.addFlightsPage)

router.post("/update", flightsCtrl.create)
module.exports = router;