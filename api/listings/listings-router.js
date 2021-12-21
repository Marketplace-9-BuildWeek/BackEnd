const router = require('express').Router()
const Listings = require('./listings-model')
const {errorHandling, validateListing, restricted} = require('./listings-middleware')

router.get('/', async (req, res, next) => {
    Listings.getAll()
        .then(listings => {
            console.log(listings)
            res.status(200).json(listings)
        })
        .catch(err => {
            next(err)
        })
})

router.post('/create', validateListing, (req, res, next) => {
    Listings.create(req.body)
        .then(listing => {
            console.log(listing)
            res.status(201).json(listing)
        })
        .catch(err => {
            next(err)
        })
})


router.use(errorHandling);

module.exports = router;