// SurveyNew shows SurveyForm and SurveyForm Review steps.  SurveyNew is a container for Wizardly steps.

import React, { Component } from 'react'
import SurveyForm from './SurveyForm'

class SurveyNew extends Component {
  render() {
    return (
      <div>
        <SurveyForm />
      </div>
    )
  }
}

export default SurveyNew