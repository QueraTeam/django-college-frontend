import React from 'react'
import Navbar from '../Components/Navbar'

export default class Tasks extends React.Component {
  state = {
    token: '',
    info: [],
    trialType: {
      imaging:'Imaging',
      signal : 'Signal',
      trials:'Trials'

    }
   
  }


  componentDidMount() {
    var getToken = this.props.location.state.token
    console.log('nameselected', getToken)
    this.setState({ token: getToken  })
  }

  render() {

    return (
      <div  >
        <Navbar token={this.state.token} />
      </div>
    )
  }
}
