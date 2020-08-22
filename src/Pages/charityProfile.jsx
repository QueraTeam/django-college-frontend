import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {IoIosAddCircle } from "react-icons/io";

export default class CharityProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        description: '',
        gender: '',
        age: '',
        charityname: '',
        regnumber: ''
      },
      charityName: '',
      taskslist: []
    }
  }
  componentDidMount() {
    let name = window.localStorage.getItem('charityname')
    console.log('name', name)
    const getToken = window.localStorage.getItem('token')
    console.log('tokenlog', getToken)
    let a = 'http://localhost:8000/tasks/?title=&charity='
    a += name
    a += '&gender=&age=&description'
    console.log('aaa url', a)
    axios.get(a, {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskslist', response.data)
        this.setState({ taskslist: response.data })
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  handleChange(event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className='bene-container'>
          <div className='demographic-container' dir='rtl' >
            <h2 style={{ alignSelf: 'center', marginTop: '2%' }}> اطلاعات کاربری</h2>
            <Form>
              <Row>
                <Col>
                  <Form.Label>نام:</Form.Label>
                  <Form.Control name='firstname'
                    placeholder='نام' onChange={(event) => this.handleChange(event)} />
                </Col>
                <Col>
                  <Form.Label>نام خانوادگی:</Form.Label>
                  <Form.Control name='lastname'
                    placeholder='نام خانوادگی' onChange={(event) => this.handleChange(event)} />
                </Col>
                <Col>
                  <Form.Label>شماره تماس:</Form.Label>
                  <Form.Control placeholder='شماره تماس' name='phone'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>ایمیل:</Form.Label>
                  <Form.Control name='email'
                    placeholder='ایمیل' onChange={(event) => this.handleChange(event)} />
                </Col>
                <Col>
                  <Form.Label>آدرس:</Form.Label>
                  <Form.Control name='address'
                    placeholder='آدرس' onChange={(event) => this.handleChange(event)} />
                </Col>
              </Row>
              <Row>
                <Col sm='8' >
                  <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Label>توضیحات:</Form.Label>
                    <Form.Control as='textarea' rows='3' name='description'
                      onChange={(event) => this.handleChange(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>جنسیت:</Form.Label>
                  <Form.Control as='select' name='gender'
                    onChange={(event) => this.handleChange(event)} >
                    <option value='female'>زن</option>
                    <option value='male'>مرد</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>سن:</Form.Label>
                  <Form.Control type='number' name='age'
                    placeholder='سن' onChange={(event) => this.handleChange(event)} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label> نام موسسه خیریه:</Form.Label>
                  <Form.Control name='charityname'
                    placeholder='نام موسسه خیریه'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>شماره ثبت:</Form.Label>
                  <Form.Control name='regnumber'
                    placeholder='شماره ثبت' onChange={(event) => this.handleChange(event)} />
                </Col>
                <Col >
                  <Button variant='info'>ثبت اطلاعات</Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='demand-container'>
            <div className='name-creat'>
              <h2 >پروژه های خیریه</h2>
              <Button variant="primary"> پروژه جدید<IoIosAddCircle size='45px' color='white' /></Button>
            </div>
            {
              this.state.taskslist.map((task, index) => {
                return (
                  <div className='task-partition' key={index}>
                    <h3 className='task-header'>
                      {task.title}
                    </h3>
                    <div className='taskbar'>
                      <div className='requirements'>
                        <p className='req-element'>
                          {task.charity.name}
                        </p>
                        <p className='req-element'>
                          {task.gender_limit}
                        </p>
                        <p className='req-element'>
                          {task.description}
                        </p>
                      </div>
                      <Button variant={this.state.buttenVariant} className='applybtn'>
                        {this.state.buttenText}
                      </Button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
