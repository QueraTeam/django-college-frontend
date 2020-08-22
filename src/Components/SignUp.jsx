import React from 'react'
import { IoMdPerson, IoMdLock } from 'react-icons/io'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { withRouter } from 'react-router'

class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: '',
        charityName: '',
        charityReg: ''
      },
      isCharity: false,
      isBenefactor: false,
      show: false
    }
  }

  checkboxChange (event) {
    const checked = event.target.checked
    const name = event.target.name
    console.log(name, event.target.checked)
    this.setState({
      [name]: checked
    })
  }

  handleChange (event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  handleClose () {
    this.setState({ show: false })
  }

  charityCheckbox (event) {
    this.setState({ charity: event.target.value })
  }

  signupRequest () {
    axios.post('http://localhost:8000/accounts/register/', {
      username: this.state.fields.username,
      password: this.state.fields.password
    })
      .then((response) => {
        console.log(response.data)
        axios.post('http://localhost:8000/accounts/login/', {
          username: this.state.fields.username,
          password: this.state.fields.password
        })
          .then((response) => {
            console.log('signup token', response.data.token)
            window.localStorage.setItem('token', response.data.token)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.setState({ show: true })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  sendRegType () {
    console.log('isChar', this.state.isCharity)
    console.log(this.state.isBenefactor)
    const isBenefactor = this.state.isBenefactor
    const ischarity = this.state.isCharity
    var token = window.localStorage.getItem('token')
    if (isBenefactor) {
      axios.post('http://localhost:8000/benefactors/', '', {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then((response) => {
          console.log(response.data)
          this.props.history.push('/tasks')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    if (ischarity) {
      axios.post('http://localhost:8000/charities/', {
        name: this.state.fields.charityName,
        reg_number: this.state.fields.charityReg
      }, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then((response) => {
          console.log(response.data)
          this.props.history.push('/tasks')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  render () {
    console.log('reg', this.state.fields.charityReg)
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
        <button className='logbtn' onClick={() => this.signupRequest()} >ثبت نام</button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <Modal.Header closeButton >
            <Modal.Title> نحوه همکاری </Modal.Title>
          </Modal.Header>
          <Modal.Body dir='rtl'>
            <div>
              <p dir='rtl' >  لطفا نحوه همکاری خود را انتخاب کنید</p>
              <div className='registerdiv'>
                <input type='checkbox' name='isCharity'
                  onChange={(event) => this.checkboxChange(event)}
                  style={{ width: '20px', height: '20px' }}
                />
                <label style={{ marginRight: '10px' }}> موسسه خیریه</label>
                <input type='checkbox' name='isBenefactor'
                  onChange={(event) => this.checkboxChange(event)}
                  style={{ marginRight: '40px', width: '20px', height: '20px' }}
                />
                <label style={{ marginRight: '10px' }}>نیکوکار</label><br />
              </div>
              {this.state.isCharity &&
                <div className='charityreg'>
                  <div className='reg'>
                    <label style={{ fontSize: 'larger' }}> نام خیریه:</label>
                    <input type='text' name='charityName'
                      onChange={(event) => this.handleChange(event)}
                    />
                  </div>
                  <div className='reg'>
                    <label style={{ fontSize: 'larger' }} > شماره ثبت:</label>
                    <input type='text' name='charityReg'
                      onChange={(event) => this.handleChange(event)}
                    />
                  </div>
                </div>
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='success' onClick={() => this.sendRegType()}>
              ثبت
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default withRouter(SignUp)
