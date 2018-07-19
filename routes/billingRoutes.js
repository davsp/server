const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!'})
        }

        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "$5 for 5 credits"
          });

        req.user.credits += 5; //add 5 and assign credits
        const user = await req.user.save() // pulls back updated user after saving
    
        res.send(user)
    }) // app.post('target/route', request/res object passed in as argument)
}