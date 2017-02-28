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
      <div style = {{textAlign:"center"}} className = "Image">
        <Helmet
            title= {this.context.intl.formatMessage({id:"sample_page2_title"})}
            meta={ [
                { name: "description", content: this.context.intl.formatMessage({id:"sample_page2_description"}) },
                ] }
            />
            <div>
                <h2> Sample Page child 2</h2>
                <p>
                  Your character is cleaning their room. Or maybe your character isn’t one to clean. Maybe your character is digging through their untidy drawers to find an item that they misplaced. For whatever the reason is, your character stumbles across an old photograph. If your character is in a state of peacefulness now, it would be best to have the photograph depict a more chaotic time in their life. If the character’s life is currently in turmoil, it would be best to have the photo depict a happier time. This will work well because not only will your character dwell on a past period of their life, but they can compare that time to the present. Maybe the photograph shows a better time; maybe because of this, the person is suddenly inspired to turn their life around. Or perhaps the character sees the photograph of what he or she once viewed as a bad event in their life, only to realize that it wasn’t as horrible as it seemed. Maybe they wish they could go back to the day that the photo was taken, or maybe they wish to rip it to shreds. The possibilities are endless.
                </p>
            </div>

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
