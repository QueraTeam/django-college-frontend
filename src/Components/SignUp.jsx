import React from 'react'
import { IoMdPerson, IoMdLock } from 'react-icons/io'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: ''
      },
      show: false
    }
  }

  handleChange (event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  handleShow () {
    this.setState({ show: true })
  }

  handleClose () {
    this.setState({ show: false })
  }

  SignupRequest () {
    axios.post('http://localhost:8000/accounts/register/', {
      username: this.state.fields.username,
      password: this.state.fields.password
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    console.log('chnge', this.state.fields)
    return (
      <div className='enter-container'>
        <div className='user-icon'>
          <IoMdPerson className='icon' size='8%' color='white' />
          <input type='text' placeholder='نام کاربری'
            name='username'
            className='username'
            onChange={(event) => this.handleChange(event)}
          />
        </div>
        <div className='user-icon'>
          <IoMdLock className='icon' size='8%' color='white' />
          <input type='password' placeholder='رمز عبور'
            name='password'
            className='username'
            onChange={(event) => this.handleChange(event)}
          />
        </div>
        <button className='logbtn' onClick={() => this.SignupRequest()} >ثبت نام</button>
        <button className='logbtn' onClick={() => this.handleShow()} >ثبت نام</button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton >
            <Modal.Title> نحوه همکاری </Modal.Title>
          </Modal.Header>
          <Modal.Body dir='rtl'>
            <p dir='rtl' >  لطفا نحوه همکاری خود را انتخاب کنید</p>
            <div className='registerdiv'>
              <input type='checkbox' name='benefactor' value='benefactor' style={{ width: '20px', height: '20px' }} />
              <label for='benefactor' style={{ marginRight: '10px' }}> نیکوکار</label>
              <input type='checkbox' name='charity' value='charity' style={{ marginRight: '40px', width: '20px', height: '20px' }} />
              <label for='charity' style={{ marginRight: '10px' }}> مرکز خیریه</label><br />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger' onClick={() => this.handleClose()}>
              بستن
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
