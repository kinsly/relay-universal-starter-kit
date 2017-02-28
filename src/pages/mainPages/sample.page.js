/*
*  Home Page
*/

import React from "react"
import Relay from "react-relay"
import {Link, browserHistory} from "react-router"
import {FormattedMessage} from 'react-intl';
import Helmet from "react-helmet";

//Containers
import SampleContainer from "../../containers/sampleContainer.js"

class HomePage extends React.Component{
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    intl : React.PropTypes.object.isRequired,
    relay: Relay.PropTypes.Environment,
  }

  render(){

    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default Relay.createContainer(HomePage, {
  fragments:{
    viewer: () => Relay.QL`
    fragment on TravelerEntry{
        id
        isLogged
        csrfToken
        currentLanguage
    }
    `
  }
})
