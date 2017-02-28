/**
* Sample Page
*/
import React, {Component} from "react"
import {FormattedMessage} from "react-intl"
import shallowCompare from 'react-addons-shallow-compare'


export default class AdditionalImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      }
  }

  static contextTypes = {
    intl : React.PropTypes.object.isRequired,
  };

  static propTypes ={
    };

    /*shouldComponentUpdate(nextProps, nextState) {
          return shallowCompare(this, nextProps, nextState);
    }*/

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
    }

  render(){

    return (<div></div>)
  }

}
