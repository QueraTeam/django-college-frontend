import React from 'react'
import {Button, NavDropdown} from 'react-bootstrap'
import axios from 'axios'
import {withRouter} from 'react-router'

class Navbar extends React.Component {
    state = {
        isBenefactor: false,
        isCharity: false
    }

    componentDidMount() {
        let b = window.localStorage.getItem('b')
        let ch = window.localStorage.getItem('ch')
        if (b) {
            this.setState({isBenefactor: true})
        }
        if (ch) {
            this.setState({isCharity: true})
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
            <div className='charityNav'>
                <nav className='mynav navbar navbar-expand-lg navbar-light'>
                    <div>
                        <ul className='navbar-nav'>
                            <li style={{color: '#fff'}}>
                                <NavDropdown title="پروفایل ">
                                    {
                                        (this.state.isBenefactor &&
                                            <NavDropdown.Item
                                                href='/benefactor'>نیکوکار</NavDropdown.Item>) ||
                                        <NavDropdown.Item href='/benefactor'
                                                          disabled>نیکوکار</NavDropdown.Item>
                                    }

                                    {
                                        (this.state.isCharity &&
                                            <NavDropdown.Item href='/charity'>موسسه
                                                خیریه</NavDropdown.Item>) ||
                                        <NavDropdown.Item href='/charity' disabled>موسسه
                                            خیریه</NavDropdown.Item>
                                    }
                                </NavDropdown>
                            </li>
                            <li>
                                <a className='nav-link' href='/tasks'
                                   style={{color: '#fff'}}>
                                    نیکوکاری‌ها
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='logOutbtn'>
                        <Button variant='danger'
                                onClick={() => this.logOut()}>
                            خروج
                        </Button>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar)
