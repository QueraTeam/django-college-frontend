import React from 'react'
import Navbar from '../Components/Navbar'
import { Input, Button } from 'reactstrap'
import { IoMdPerson, IoMdLock } from 'react-icons/io'


export default class Tasks extends React.Component {
  state = {
    token: '',
    info: [],
    trialType: {
      imaging: 'Imaging',
      signal: 'Signal',
      trials: 'Trials'

    }

  }


  componentDidMount() {
    var getToken = this.props.location.state.token
    console.log('tokenlog', getToken)
    this.setState({ token: getToken })
  }

  render() {

    return (
      <div className='taskPage' dir='rtl'>
        <Navbar token={this.state.token} />
        <div className='searchBar'>
          <Input placeholder='موضوع'/>
          <Input />
          <Input />
          <select> 
            <option>زن</option>
          <option>مرد</option>
          </select>
          <Input />         
          <Button > جستجو </Button>
        </div>
        <div className='taskContainer' >

        </div>
      </div>
    )
  }
}
