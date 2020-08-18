import React from 'react'
import { Button } from 'react-bootstrap'


export default class Navbar extends React.Component {
  //constructor(props) {
  //super(props)



  render() {
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
                <a className='nav-link' href='/' style={{ color: '#fff' }}>
                  فرصت های نیکویی
                </a>
              </li>
              <li  >
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
