/**
* Sample Navigation
*/
import React, {Component} from "react"
import {FormattedMessage} from "react-intl"
import {Link, browserHistory} from "react-router"

//Component Styles
const styles = {
  container:{
    display: "block",
    position: "relative",
    textAlign: "center",
    margin: "30px",
    fontSize: "20px"
  }
}

export default class SampleNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      }
  }

  static contextTypes = {
    intl : React.PropTypes.object.isRequired,
  };

  render(){
    return (
      <div>
        <p style = {styles.container}>
          <Link to="/"> Home Page </Link> |
          <Link to="/en/sample/list"> Sample Page 1 </Link> |
          <Link to="/en/sample/edit"> Sample Page 2</Link> |
        </p>

      </div>
    )
  }

}
