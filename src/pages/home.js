/*
*  Home Page
*/

import React from "react"
import Relay from "react-relay"
import {Link, browserHistory} from "react-router"
import {injectIntl, IntlProvider,FormattedMessage} from 'react-intl';
import Helmet from "react-helmet";

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
      <div style = {{textAlign:"center"}} className = "Image">
          <Helmet
              title= {this.context.intl.formatMessage({id:"home_page_title"})}
              meta={ [
                  { name: "description", content: this.context.intl.formatMessage({id:"home_page_description"}) },
                  ] }
              />
              <h2> Home Page</h2>
              <Link to= "/en/sample"> To Sample Page </Link>
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
