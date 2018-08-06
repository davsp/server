// SURVEY FORM contains a basic form
import _ from 'lodash'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label: 'Survey Title', name: 'title'},
    { label: 'Subject Line', name: 'subject'},
    { label: 'Email Body', name: 'body'},
    { label: 'Recipient List', name: 'emails'}
]

class SurveyForm extends Component {
    renderFields() {

        // ({ label, name }) are destructures from field.label and field.name
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">NEXT<i className="material-icons right">done</i></button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '')

    _.each(FIELDS, ({ name, label }) => { // for every field object in fields array, run arrow function
        if (!values[name]) {
            errors[name] = 'You must provide a ' + label.toUpperCase()
        }
    })

    // if there are no errors, proceed.
    return errors;
}

export default reduxForm({
    validate, // validate : validate (this is es6 just to run the function validate())
    form: 'surveyForm'
})(SurveyForm)