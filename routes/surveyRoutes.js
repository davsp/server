const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url')

const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')


const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('thanks for submitting your vote!')
    })

    app.post('/api/surveys/webhooks', ((req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice')

        const events = _.map(req.body,  ({ email, url }) => { // email and url destructured from event object
            const match = p.test(new URL(url).pathname)

            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice }
            }
        }) 
        
        compactEvents = _.compact(events)
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')

        console.log(uniqueEvents)

        res.send({})
    }))

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            //destructured here, title: title, subject: subject, body: body
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),

            _user: req.user.id,
            dateSent: Date.now()
        })

        //place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey))
        
        try {
        await mailer.send()
        await survey.save()

        req.user.credits -= 1;
        const user = await req.user.save()
    
        res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })


}