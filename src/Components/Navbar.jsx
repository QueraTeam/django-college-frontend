import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router'

class Navbar extends React.Component {
  logOut () {
    const token = window.localStorage.getItem('token')
    axios.post('http://localhost:8000/accounts/logout/', '', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        this.props.history.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div className='charityNav' >
        <nav className=' navbar navbar-expand-lg navbar-light ' >
          <div >
            <ul className='navbar-nav'>
              <li >
                <a className='nav-link' href='/' style={{ color: '#fff' }}>
                  پروفایل
                </a>
              </li>
              <li >
                <a className='nav-link' href='/tasks' style={{ color: '#fff' }}>
                  فرصت های نیکو
                </a>
              </li>
              <li >
                <div className='logOutbtn'>
                  <Button variant='danger' onClick={() => this.logOut()}>
                    خروج
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
export default withRouter(Navbar)
