import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Login from '../Components/Login'
import SignUp from '../Components/SignUp'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 1
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(key) {
    this.setState({ key })
  }

  render() {
    return (
      <div className='log-body' dir='rtl' >
        <div className='log-container'>
          <div className='log-pic'>
            <img src={'/Images/tree.png'} alt='charity' width='80%' height='73%' />
          </div>
          <div className='login-signup'>
            <Tabs
              style={{ border: 'none' }}
              activeKey={this.state.key}
              onSelect={(eventKey) => this.handleSelect(eventKey)}
            >
              <Tab eventKey={1} title='ورود'>
                <Login />
              </Tab>
              <Tab eventKey={2} title='ثبت نام'>
                <SignUp />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
