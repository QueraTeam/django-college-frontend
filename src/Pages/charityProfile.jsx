import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Form, Button, Row, Col, Modal, Tabs, Tab, Alert, Card, Badge } from 'react-bootstrap'
import { IoIosAddCircle } from 'react-icons/io'
import Calender from '../Components/Calender'
import { MdError } from 'react-icons/md'


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
      taskslist: [],
      show: false,
      date: '',
      key: 1,
      buttenText: '',
      buttenVariant: '',
      newTaskFields: {
        title: '',
        description: '',
        gender: '',
      },
      ageFrom: '',
      ageTo: '',
      regexp: /^[1-9\b]+$/,
      alartShow: false
    }
  }

  componentDidMount() {
    let name = window.localStorage.getItem('charityname')
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks/?title=&charity='
    a += name
    a += '&gender=&age=&description'
    axios.get(a, {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskslist', response.data)
        response.data.map((task) => {
          if (task.gender_limit == 'F') {
            task.genderName = 'زن'
          } else if (task.gender_limit == 'M') {
            task.genderName = 'مرد'
          }
        })
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

  handleShow() {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleSelect(key) {
    this.setState({ key })
  }

  calenderDateChange(date) {
    this.setState({ date })
  }

  newTaskChange(event) {
    const name = event.target.name
    const changeNewTaskFields = this.state.newTaskFields
    changeNewTaskFields[name] = event.target.value
    this.setState({ newTaskChange: changeNewTaskFields })
  }

  agefChange(e) {
    let ageFrom = e.target.value
    if (ageFrom === '' || this.state.regexp.test(ageFrom)) {
      this.setState({ [e.target.name]: ageFrom })
    }
  }

  agetChange(e) {
    let ageTo = e.target.value
    if (ageTo === '' || this.state.regexp.test(ageTo)) {
      this.setState({ [e.target.name]: ageTo })
    }
  }

  newTaskRequest() {
    var token = window.localStorage.getItem('token')
    let genderSelected = null
    if (this.state.gender !== '') {
      genderSelected = this.state.newTaskFields.gender
    }
    let data = {
      title: this.state.newTaskFields.title,
      description: this.state.newTaskFields.description,
      age_limit_from: this.state.ageFrom,
      age_limit_to: this.state.ageTo,
      gender_limit: genderSelected,

    }
    let config = {
      headers: { 'Authorization': `Token ${token}` },
      params: { date: this.state.date }

    }
    axios.post('http://localhost:8000/tasks/', data, config)
      .then((response) => {
        console.log(response.data)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ alartShow: true })
      })
  }

  acceptedResponse(taskId) {
    var token = window.localStorage.getItem('token')
    var acc = 'A'
    let a = 'http://localhost:8000/tasks/'
    a += taskId
    a += '/response/'
    axios.post(a, {
      response: acc
    }, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  rejectedResponse(taskId) {
    var token = window.localStorage.getItem('token')
    var rej = 'R'
    let a = 'http://localhost:8000/tasks/'
    a += taskId
    a += '/response/'
    axios.post(a, {
      response: rej
    }, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  taskDone(taskId) {
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks/'
    a += taskId
    a += '/done/'

    axios.post(a, '', {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskrequest', response.data)
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  alertclose() {
    this.setState({ alartShow: false })
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
                  <Form.Control name='email' placeholder='ایمیل'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>آدرس:</Form.Label>
                  <Form.Control name='address' placeholder='آدرس'
                    onChange={(event) => this.handleChange(event)}
                  />
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
                <Col >
                  <Form.Label>جنسیت:</Form.Label>
                  <Form.Control as='select' name='gender'
                    onChange={(event) => this.handleChange(event)} >
                    <option value=''></option>
                    <option value='female'>زن</option>
                    <option value='male'>مرد</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>سن:</Form.Label>
                  <Form.Control type='number' name='age' placeholder='سن'
                    onChange={(event) => this.handleChange(event)}
                  />
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
                  <Form.Control name='regnumber' placeholder='شماره ثبت'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col >
                  <Button variant='info'> ثبت اطلاعات </Button>
                </Col>
              </Row>
            </Form>
          </div>
          <div className='demand-container'>
            <div className='name-creat' >
              <h2 >پروژه های خیریه</h2>
              <Button variant='primary' onClick={() => this.handleShow()}>
                پروژه جدید <IoIosAddCircle size='45px' color='white' />
              </Button>
              <Modal show={this.state.show} onHide={() => this.handleClose()} size='lg' id='charitymodal'>
                <Modal.Header id='chmodt' closeButton >
                  <Modal.Title> ایجاد پروژه جدید </Modal.Title>
                </Modal.Header>
                <Modal.Body dir='rtl' style={{ textAlign: 'right' }}>
                  <Form>
                    <Row >
                      <Col sm='4'>
                        <Form.Label> عنوان: </Form.Label>
                        <Form.Control name='title'
                          placeholder='عنوان' onChange={(event) => this.newTaskChange(event)} />
                      </Col>
                      <Col sm='3'>
                        <Form.Label> جنسیت: </Form.Label>
                        <Form.Control as='select' name='gender'
                          onChange={(event) => this.newTaskChange(event)} >
                          <option value=''>تفاوتی ندارد</option>
                          <option value='M'>مرد</option>
                          <option value='F'>زن</option>
                        </Form.Control>
                      </Col>
                      <Col sm='2'>
                        <Form.Label> سن از: </Form.Label>
                        <Form.Control name='ageFrom' type='text' placeholder='از'
                          value={this.state.ageFrom}
                          onChange={(e) => this.agefChange(e)}
                        />
                      </Col>
                      <Col sm='2'>
                        <Form.Label> تا: </Form.Label>
                        <Form.Control
                          type="text" name="ageTo" placeholder="سن"
                          value={this.state.ageTo}
                          onChange={(e) => this.agetChange(e)}
                        />
                      </Col>
                    </Row>
                    <br />
                    <Row >
                      <Col sm='2'> </Col>
                      <Col sm='8'>
                        <Form.Label>توضیحات:</Form.Label>
                        <Form.Control name='description' placeholder='توضیحات'
                          onChange={(event) => this.newTaskChange(event)}
                        />
                      </Col>
                      <Col sm='2'> </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col sm='3'> </Col>
                      <Col sm='6'>
                        <Form.Label> انتخاب تاریخ: </Form.Label>
                        <Calender name='date'
                          calenderDateChange={(date) => this.calenderDateChange(date)}
                        />
                      </Col>
                      <Col sm='3'> </Col>
                    </Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer id='newtaskFooter'>
                  <Alert show={this.state.alartShow} variant='danger'
                    onClose={() => this.alertclose()} dismissible >
                    <MdError size='25px' /> <span style={{ margin: '2%', fontWeight: 'bold' }}> خطا</span>
                  </Alert>
                  <Button id='newtaskClose' variant='outline-dark' onClick={() => this.newTaskRequest()}>
                    ذخیره
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <Tabs
              style={{ border: 'none' }}
              activeKey={this.state.key}
              onSelect={(eventKey) => this.handleSelect(eventKey)}
            >
              <Tab eventKey={1} title='در انتطار پذیرش'>
                {
                  this.state.taskslist.map((task, index) => {
                    if (task.state == 'P') {
                      return (
                        <div key={index}>
                          <Card className='text-right' style={{ margin: '2%' }}>
                            <Card.Header as='h4'>{task.title}
                              <Badge variant='info'>قابل انتخاب</Badge>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p > {task.genderName} </p>
                              <p > {task.description} </p>
                            </Card.Body>
                          </Card>

                        </div>
                      )
                    }
                  })}
              </Tab>
              <Tab eventKey={2} title='در انتطار تائید'>
                {
                  this.state.taskslist.map((task, index) => {
                    if (task.state == 'W') {
                      return (
                        <div key={index}>
                          <Card className='text-right' style={{ margin: '2%' }}>
                            <Card.Header as='h4'>{task.title}
                              <Badge variant='warning'>در حال بررسی</Badge>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p > {task.genderName} </p>
                              <p > {task.description} </p>
                              <div className='responses'>
                                <Button variant='success'
                                  onClick={() => this.acceptedResponse(task.id)}>
                                  تائید
                                </Button>
                                <Button variant='danger'
                                  onClick={() => this.rejectedResponse(task.id)}>
                                  رد
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    }
                  })
                }
              </Tab>
              <Tab eventKey={3} title='تائید شده'>
                {
                  this.state.taskslist.map((task, index) => {
                    if (task.state == 'A') {
                      return (
                        <div key={index}>
                          <Card className='text-right' style={{ margin: '2%' }}>
                            <Card.Header as='h4'>{task.title}
                              <Badge variant='success' >تائید شده</Badge>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p > {task.genderName} </p>
                              <p > {task.description} </p>
                              <div className='responses'>
                                <Button variant='success' size='lg'
                                  onClick={() => this.taskDone(task.id)} >
                                  اتمام پروژه
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    }
                  })
                }
              </Tab>
              <Tab eventKey={4} title='انجام شده'>
                {
                  this.state.taskslist.map((task, index) => {
                    if (task.state == 'D') {
                      return (
                        <div key={index}>
                          <Card className='text-right' style={{ margin: '2%' }}>
                            <Card.Header as='h4'>{task.title}
                              <Badge variant='dark' >انجام شده</Badge>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p > {task.genderName} </p>
                              <p > {task.description} </p>
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    }
                  })
                }
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
