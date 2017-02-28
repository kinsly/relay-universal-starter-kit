/*
*  Sample Page children 2
*/

import React from "react"
import Relay from "react-relay"
import {Link, browserHistory} from "react-router"
import {FormattedMessage} from 'react-intl';
import Helmet from "react-helmet";


class SampleSub2 extends React.Component{
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
        <Helmet
            title= {this.context.intl.formatMessage({id:"sample_page2_title"})}
            meta={ [
                { name: "description", content: this.context.intl.formatMessage({id:"sample_page2_description"}) },
                ] }
            />
            <h2> Sample Page child 2</h2>
        </div>
    )
  }

}

export default Relay.createContainer(SampleSub2, {
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
