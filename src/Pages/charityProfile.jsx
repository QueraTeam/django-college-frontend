import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Form, Button, Row, Col, Modal, Tabs, Tab, Alert, Card, Badge } from 'react-bootstrap'
import { IoIosAddCircle } from 'react-icons/io'
import { MdError } from 'react-icons/md'


export default class CharityProfile extends React.Component {

  state = {
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
    newTaskFields: {
      title: '',
      description: '',
      age_limit_from: '',
      age_limit_to: '',
      gender_limit: '',
      date: ''
    },
    taskslist: [],
    charityName: '',
    show: false,
    alartShow: false,
    errorModalShow: false,
    key: 1,
    regexp: /^[0-9\b]+$/
  }

  componentDidMount() {
    let name = window.localStorage.getItem('charityname')
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks?charity='
    a += name
    axios.get(a, {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskslist', response.data)
        response.data.map((task) => {
          if (task.gender_limit === 'F') {
            task.genderName = 'جنسیت: زن'
          } if (task.gender_limit === 'M') {
            task.genderName = 'جنسیت: مرد'
          } if (task.gender_limit === 'MF') {
            task.genderName = 'جنسیت: هردو'
          }
        })
        this.setState({ taskslist: response.data })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ errorModalShow: true })
      })
  }

  handleChange(event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  modalShow() {
    this.setState({ show: true })
  }

  modalClose() {
    this.setState({ show: false })
  }

  tabSelect(key) {
    this.setState({ key })
  }

  newTaskChange(event) {
    const name = event.target.name
    const changeNewTaskFields = this.state.newTaskFields
    changeNewTaskFields[name] = event.target.value
    this.setState({ newTaskChange: changeNewTaskFields })
  }

  agefChange(e) {
    let age_limit_from = e.target.value
    if (age_limit_from === '' || this.state.regexp.test(age_limit_from)) {
      this.setState({ ...this.state, newTaskFields: { ...this.state.newTaskFields, age_limit_from: age_limit_from } })
    }
  }

  agetChange(e) {
    let age_limit_to = e.target.value
    if (age_limit_to === '' || this.state.regexp.test(age_limit_to)) {
      this.setState({ ...this.state, newTaskFields: { ...this.state.newTaskFields, age_limit_to: age_limit_to } })
    }
  }

  newTaskRequest() {
    var token = window.localStorage.getItem('token')
    let data = {
      title: this.state.newTaskFields.title,
    }
    let a = ['description', 'age_limit_from', 'age_limit_to', 'gender_limit', 'date']
    for (let i = 0; i < a.length; i++) {

      if (this.state.newTaskFields[a[i]]) {
        data[a[i]] = this.state.newTaskFields[a[i]];
      }
    }

    let config = {
      headers: { 'Authorization': `Token ${token}` }
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

  acceptedResponse(task) {
    var token = window.localStorage.getItem('token')
    var acc = 'A'
    let a = 'http://localhost:8000/tasks/'
    a += task.id
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
        task.state = 'A'
        this.setState({ task })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ errorModalShow: true })
      })
  }

  rejectedResponse(task) {
    var token = window.localStorage.getItem('token')
    var rej = 'R'
    let a = 'http://localhost:8000/tasks/'
    a += task.id
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
        task.state = 'P'
        this.setState({ task })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ errorModalShow: true })
      })
  }

  taskDone(task) {
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks/'
    a += task.id
    a += '/done/'
    axios.post(a, '', {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskrequest', response.data)
        task.state = 'D'
        this.setState({ task })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ errorModalShow: true })
      })
  }

  alertclose() {
    this.setState({ alartShow: false })
  }

  errorTaskClose() {
    this.setState({ errorModalShow: false })
  }

  removeDate() {
    var newTaskFields = { ...this.state.newTaskFields }
    newTaskFields.date = ''
    this.setState({ newTaskFields })
  }


  render() {
    console.log('d', this.state.newTaskFields.date)
    return (
      <div>
        <Navbar />
        <div className='bene-container'>
          <div className='demographic-container' dir='rtl' >
            <h2 style={{ alignSelf: 'center', marginTop: '2%' }}> اطلاعات کاربری</h2>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Label>نام</Form.Label>
                  <Form.Control name='firstname'
                    placeholder='نام خود را وارد نمایید' onChange={(event) => this.handleChange(event)} />
                </Col>
                <Col>
                  <Form.Label>نام خانوادگی</Form.Label>
                  <Form.Control name='lastname'
                    placeholder='نام خانوادگی خود را وارد نمایید' onChange={(event) => this.handleChange(event)} />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col >
                  <Form.Label>جنسیت</Form.Label>
                  <Form.Control as='select' name='gender'
                    onChange={(event) => this.handleChange(event)} >
                    <option value=''></option>
                    <option value='F'>زن</option>
                    <option value='M'>مرد</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Form.Label>سن</Form.Label>
                  <Form.Control type='number' name='age' placeholder='سن خود را وارد نمایید'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>ایمیل</Form.Label>
                  <Form.Control name='email' placeholder='ایمیل خود را وارد نمایید'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>شماره تماس</Form.Label>
                  <Form.Control placeholder=' شماره تماس خود را وارد نمایید' name='phone'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>آدرس</Form.Label>
                  <Form.Control name='address' placeholder='آدرس خود را وارد نمایید'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label> نام موسسه خیریه</Form.Label>
                  <Form.Control name='charityname'
                    placeholder=' نام موسسه خیریه خود را وارد نمایید'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
                <Col>
                  <Form.Label>شماره ثبت</Form.Label>
                  <Form.Control name='regnumber' placeholder=' شماره ثبت موسسه خیریه خود را وارد نمایید'
                    onChange={(event) => this.handleChange(event)}
                  />
                </Col>
              </Form.Row>
              <Form.Row>
                <Col sm='12' >
                  <Form.Group controlId='exampleForm.ControlTextarea1'>
                    <Form.Label>توضیحات</Form.Label>
                    <Form.Control as='textarea' rows='3' name='description'
                      onChange={(event) => this.handleChange(event)}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col sm='5'></Col>
                <Col  >
                  <Button variant='info'> ثبت اطلاعات </Button>
                </Col>
                <Col sm='8'></Col>
              </Form.Row>
            </Form>
          </div>
          <div className='demand-container'>
            <div className='name-creat'>
              <h2>پروژه های خیریه</h2>
              <Button variant='primary' onClick={() => this.modalShow()}>
                پروژه جدید <IoIosAddCircle size='45px' color='white' />
              </Button>
              <Modal show={this.state.show} onHide={() => this.modalClose()} size='lg' id='charitymodal' >
                <Modal.Header id='chmodt' closeButton>
                  <Modal.Title> ایجاد پروژه جدید </Modal.Title>
                </Modal.Header>
                <Modal.Body dir='rtl' style={{ textAlign: 'right' }}>
                  <Row>
                    <Col sm='4'>
                      <Form.Label> عنوان: </Form.Label>
                      <Form.Control name='title'
                        placeholder='عنوان' onChange={(event) => this.newTaskChange(event)} />
                    </Col>
                    <Col sm='3'>
                      <Form.Label> جنسیت: </Form.Label>
                      <Form.Control as='select' name='gender_limit'
                        onChange={(event) => this.newTaskChange(event)} >
                        <option value='MF'>تفاوتی ندارد</option>
                        <option value='M'>مرد</option>
                        <option value='F'>زن</option>
                      </Form.Control>
                    </Col>
                    <Col sm='2'>
                      <Form.Label> سن از: </Form.Label>
                      <Form.Control name='age_limit_from' type='text' placeholder='از'
                        value={this.state.newTaskFields.age_limit_from}
                        onChange={(e) => this.agefChange(e)}
                      />
                    </Col>
                    <Col sm='2'>
                      <Form.Label> تا: </Form.Label>
                      <Form.Control
                        type='text' name='age_limit_to' placeholder='سن'
                        value={this.state.newTaskFields.age_limit_to}
                        onChange={(e) => this.agetChange(e)}
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row >
                    <Col sm='2'> </Col>
                    <Col sm='8'>
                      <Form.Label>توضیحات:</Form.Label>
                      <Form.Control as='textarea' rows='2' name='description' placeholder='توضیحات'
                        onChange={(event) => this.newTaskChange(event)}
                      />
                    </Col>
                    <Col sm='2'> </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col sm='3'> </Col>
                    <Col sm='6'>
                      <Row>
                        <Form.Label> انتخاب تاریخ:  </Form.Label>
                      </Row>
                      <Form.Control type='date' name='date'
                        onChange={(event) => this.newTaskChange(event)} value={this.state.newTaskFields.date} />
                    </Col>
                    <Col sm='3'> </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer id='newtaskFooter'>
                  <Button variant='light' onClick={() => this.removeDate()}>
                    پاک کردن تاریخ
                  </Button>
                  <Alert show={this.state.alartShow} variant='danger'
                    onClose={() => this.alertclose()} dismissible >
                    <MdError size='25px' />
                    <span style={{ margin: '2%', fontWeight: 'bold' }}>خطا</span>
                  </Alert>
                  <Button id='newtaskClose' variant='outline-dark'
                    onClick={() => this.newTaskRequest()}>
                    ذخیره
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <Tabs
              style={{ border: 'none' }}
              activeKey={this.state.key}
              onSelect={(eventKey) => this.tabSelect(eventKey)}
            >
              <Tab eventKey={1} title='در انتطار پذیرش'>
                {
                  this.state.taskslist.map((task, index) => {
                    if (task.state === 'P') {
                      return (
                        <div key={index}>
                          <Card className='text-right' id='charityCard'>
                            <Card.Header as='h4'>

                              <Row>
                                {task.title}
                                <Badge variant='info'>قابل انتخاب</Badge>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p> {task.genderName} </p>
                              <p> {task.description} </p>
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
                    if (task.state === 'W') {
                      return (
                        <div key={index}>
                          <Card className='text-right' id='charityCard'>
                            <Card.Header as='h4'>
                              <Row>
                                {task.title}
                                <Badge variant='warning'>در حال بررسی</Badge>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p> {task.genderName} </p>
                              <p> {task.description} </p>
                              <div className='responses'>
                                <Button variant='success'
                                  onClick={() => this.acceptedResponse(task)}>
                                  تائید
                                </Button>
                                <Button variant='danger'
                                  onClick={() => this.rejectedResponse(task)}>
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
                    if (task.state === 'A') {
                      return (
                        <div key={index}>
                          <Card className='text-right' id='charityCard'>
                            <Card.Header as='h4'>
                              <Row>
                                {task.title}
                                <Badge variant='success' >تائید شده</Badge>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p> {task.genderName} </p>
                              <p> {task.description} </p>
                              <div className='responses'>
                                <Button variant='success' size='lg'
                                  onClick={() => this.taskDone(task)} >
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
                    if (task.state === 'D') {
                      return (
                        <div key={index}>
                          <Card className='text-right' id='charityCard'>
                            <Card.Header as='h4'>
                              <Row>
                                {task.title}
                                <Badge variant='dark' >انجام شده</Badge>
                              </Row>
                            </Card.Header>
                            <Card.Body>
                              <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                              <p> {task.genderName} </p>
                              <p> {task.description} </p>

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
        <Modal show={this.state.errorModalShow} onHide={() => this.errorTaskClose()} size='sm' id='taskError'>
          <Modal.Header closeButton id='taskerrorHead' >
            <Modal.Body id='taskerrorBody' >
              <span style={{ fontWeight: 'bold' }} > خطا </span>
              <MdError size='25px' />
            </Modal.Body >
          </Modal.Header>
        </Modal>
      </div>
    )
  }
}
