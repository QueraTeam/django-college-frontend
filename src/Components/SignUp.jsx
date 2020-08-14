import React from "react";
import { IoMdPerson, IoMdLock } from "react-icons/io";
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

export default class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: {
                username: '',
                password: ''
            },
            show: false
        }
        this.handleClose = this.handleClose.bind(this)
    }

    handleChange(event) {
        const name = event.target.name
        const changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({ fields: changeFields })
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleRequest() {
        axios.post('http://localhost:8000/accounts/register/', {
            username: this.state.fields.username,
            password: this.state.fields.password
        })
            .then((response) => {
                console.log(response.data)
                this.setState({ show: true });


            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        console.log('chnge', this.state.fields)
        return (
            <div className='enter-container'>
                <div className='user-icon'>
                    <IoMdPerson className="icon" size="8%" color='white' />
                    <input type='text' placeholder='نام کاربری'
                        name='username'
                        className='username'
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <div className='user-icon'>
                    <IoMdLock className="icon" size="8%" color='white' />
                    <input type='password' placeholder='رمز عبور'
                        name='password'
                        className='username'
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <button className='logbtn' onClick={() => this.handleRequest()} >ثبت نام</button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> نوع ثبت نام </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> نیوکار یا مرکز خیریه </Modal.Body>
                    <Modal.Footer>
                        <Button variant='outline-danger' onClick={this.handleClose}>
                            Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
