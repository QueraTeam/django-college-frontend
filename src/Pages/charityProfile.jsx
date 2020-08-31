import React from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { IoIosAddCircle } from 'react-icons/io';
import Calender from '../Components/Calender'

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
      buttenText: '',
      buttenVariant: '',
      newTaskFields: {
        title: '',
        description: '',
        gender: '',
        ageFrom: '',
        ageTo: '',
      }
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

  handleShow() {
    this.setState({ show: true })
  }

  handleClose() {
    this.setState({ show: false })
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

  newTaskRequest() {
    let genderSelected = null;
    if (this.state.gender !== '') {
      genderSelected = this.state.newTaskFields.gender
    }
    var token = window.localStorage.getItem('token')

    axios.post('http://localhost:8000/tasks/', {
      title: this.state.newTaskFields.title,
      description: this.state.newTaskFields.description,
      age_limit_from: this.state.newTaskFields.ageFrom,
      age_limit_to: this.state.newTaskFields.ageTo,
      gender_limit: genderSelected,
      date: this.state.date
    }, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log(response.data)
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error)
      })


  }


  render() {
    console.log('date', this.state.newTaskFields)
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
            <div className='name-creat' >
              <h2 >پروژه های خیریه</h2>
              <Button variant='primary' onClick={() => this.handleShow()}>
                پروژه جدید<IoIosAddCircle size='45px' color='white' />
              </Button>

              <Modal show={this.state.show} onHide={() => this.handleClose()} size='lg' id='charitymodal'>
                <Modal.Header id='chmodt' closeButton >
                  <Modal.Title> ایجاد پروژه جدید </Modal.Title>
                </Modal.Header>
                <Modal.Body dir='rtl' style={{ textAlign: 'right' }}>
                  <Form>
                    <Row >
                      <Col sm='4'>
                        <Form.Label>عنوان:</Form.Label>
                        <Form.Control name='title'
                          placeholder='عنوان' onChange={(event) => this.newTaskChange(event)} />
                      </Col>
                      <Col sm='3'>
                        <Form.Label>جنسیت:</Form.Label>
                        <Form.Control as='select' name='gender'
                          onChange={(event) => this.newTaskChange(event)} >
                          <option value='F'>زن</option>
                          <option value='M'>مرد</option>
                          <option value=''>تفاوتی ندارد</option>
                        </Form.Control>
                      </Col>

                      <Col sm='2'>
                        <Form.Label> سن از:</Form.Label>
                        <Form.Control name='ageFrom' type='number'
                          placeholder='از' onChange={(event) => this.newTaskChange(event)} />
                      </Col>
                      <Col sm='2'>
                        <Form.Label> تا:</Form.Label>

                        <Form.Control name='ageTo' type='number'
                          placeholder='تا' onChange={(event) => this.newTaskChange(event)} />
                      </Col>


                    </Row>
                    <br />
                    <Row >
                      <Col sm='2'>

                      </Col>
                      <Col sm='8'>
                        <Form.Label>توضیحات:</Form.Label>
                        <Form.Control name='description'
                          placeholder='توضیحات' onChange={(event) => this.newTaskChange(event)} />
                      </Col>
                      <Col sm='2'>

                      </Col>

                    </Row>
                    <br></br>
                    <Row>
                      <Col sm='3'>

                      </Col>
                      <Col sm='6'>
                        <Form.Label>انتخاب تاریخ:</Form.Label>
                        <Calender name='date'
                          calenderDateChange={(date) => this.calenderDateChange(date)}
                        />
                      </Col>
                      <Col sm='3'>

                      </Col>

                    </Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="outline-dark" onClick={() => this.newTaskRequest()}>
                    ذخیره
            </Button>
                </Modal.Footer>
              </Modal>
            </div>
            {
              this.state.taskslist.map((task, index) => {
                if (task.state === 'P') {
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
                        <Button variant='danger' className='applybtn' 
                          onClick={() => this.taskRequest(task.id)}
                          disabled
                        >
                          در انتظار پذیرش
                        </Button>
                        
                      </div>
                    </div>
                  )
                } if (task.state === 'W') {
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
                        <Button variant='dark' className='applybtn'

                          onClick={() => this.taskRequest(task.id)}
                        >
                          در انتظار تائید
                        </Button>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
