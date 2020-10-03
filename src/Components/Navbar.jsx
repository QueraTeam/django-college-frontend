import React from 'react'
import { Button, NavDropdown, Navbar, Nav } from 'react-bootstrap'
import axios from 'axios'
import { withRouter } from 'react-router'

class MyNavbar extends React.Component {
  state = {
    isBenefactor: false,
    isCharity: false
  }

  componentDidMount() {
    let b = window.localStorage.getItem('b')
    let ch = window.localStorage.getItem('ch')
    if (b) {
      this.setState({ isBenefactor: true })
    }
    if (ch) {
      this.setState({ isCharity: true })
    }
    console.log('hii', this.state)
  }

  logOut() {
    const token = window.localStorage.getItem('token')
    axios.post('http://localhost:8000/accounts/logout/', '', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        console.log('hii', this.state)

        this.props.history.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='divNav'>
        <Navbar bg='dark' expand='lg' dir='rtl' style={{ width: '63%' }}>
          <Navbar.Brand href='/tasks' style={{ color: '#fff' }}>نیکوکاری ها </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav>
              <NavDropdown title='پروفایل '>
                {
                  (this.state.isBenefactor &&
                    <NavDropdown.Item
                      href='/benefactor'>نیکوکار</NavDropdown.Item>) ||
                  <NavDropdown.Item href='/benefactor'
                    disabled>نیکوکار</NavDropdown.Item>
                }

                {
                  (this.state.isCharity &&
                    <NavDropdown.Item href='/charity'>موسسه خیریه
                                                </NavDropdown.Item>) ||
                  <NavDropdown.Item href='/charity' disabled>
                    موسسه خیریه</NavDropdown.Item>
                }
              </NavDropdown>
            </Nav>
            <nav className='mr-auto'>
              <Button variant='danger'
                onClick={() => this.logOut()}>
                خروج
              </Button>
            </nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
export default withRouter(MyNavbar)
