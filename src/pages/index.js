//import "babel-polyfill";
global.Intl = require('intl');

import React, {Component} from "react"
import Relay from "react-relay"
import  ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link, browserHistory} from "react-router"
import {injectIntl, IntlProvider, FormattedMessage} from 'react-intl';
import Locale from "../locale/index.js"

//Components
import Navigation from "../components/navigation.js"

class IndexPage extends Component{
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  render(){
    return(
        <IntlProvider locale="en"  messages = {Locale("en")}>
          <div>
              <Navigation/>
              <ReactCSSTransitionGroup
                  component="div"
                  transitionName="react-page"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                  {
                    React.cloneElement(this.props.children, {
                      key: this.props.location.pathname,
                      isFetching: (status) => console.log("")
                    })
                  }
              </ReactCSSTransitionGroup>
            </div>
        </IntlProvider>
      )
  }


}

export default Relay.createContainer(IndexPage, {
  fragments:{
    viewer: () => Relay.QL`
    fragment on TravelerEntry{
      id
      currentLanguage
    }
    `
  }
})
