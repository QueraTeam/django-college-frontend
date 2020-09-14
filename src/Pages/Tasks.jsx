import React from 'react'
import Navbar from '../Components/Navbar'
import { Input } from 'reactstrap'
import { Button, Form, Card, Badge, Modal } from 'react-bootstrap'
import { IoMdSearch } from 'react-icons/io'
import { MdError } from 'react-icons/md'

import axios from 'axios'


export default class Tasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        title: '',
        charityName: '',
        gender: '',
        age: '',
        description: ''
      },
      buttenText: '',
      buttenVariant: '',
      taskslist: [],
      age: '',
      regexp: /^[1-9\b]+$/,
      show: false
    }

  }

  componentDidMount() {
    const getToken = window.localStorage.getItem('token')
    let b = window.localStorage.getItem('b')

    axios.get('http://localhost:8000/tasks/?title=&charity=&gender=&age=&description', {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('hhhh', response.data)
        response.data.map((task) => {
          if (task.gender_limit == 'F') {
            task.genderName = 'زن'
          } else if (task.gender_limit == 'M') {
            task.genderName = 'مرد'
          }
        })

        this.setState({ taskslist: response.data })

      })
      .catch((error) => {
        console.log(error)
        this.setState({ show: true })
      })
  }

  handleChange(event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  ageChange(e) {
    let age = e.target.value
    if (age === '' || this.state.regexp.test(age)) {
      this.setState({ [e.target.name]: age })
    }
  }

  filteredSearch() {
    const getToken = window.localStorage.getItem('token')
    let config = {
      headers: { 'Authorization': `Token ${getToken}` },
      params: {
        title: this.state.fields.title,
        charity: this.state.fields.charityName,
        gender: this.state.fields.gender,
        age: this.state.age,
        description: this.state.fields.description
      }
    }
    axios.get('http://localhost:8000/tasks/?', config)
      .then((response) => {
        this.setState({ taskslist: response.data })

      })
      .catch((error) => {
        console.log(error)
        this.setState({ show: true })
      })
  }

  taskRequest(taskId) {
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks/'
    a += taskId
    a += '/request/'

    axios.get(a, {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        console.log('taskrequest', response.data)
        window.location.reload()
      })
      .catch((error) => {
        console.log(error)
        this.setState({ show: true })
      })
  }


  handleClose() {
    this.setState({ show: false })
  }

  render() {
    console.log('geb', this.state.fields.gender)
    return (
      <div className='taskPage' dir='rtl'>
        <Navbar />
        <div className='searchBar form-row'>
          <div className='col-2'>
            <Input type='text' name='title' placeholder='موضوع'
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className='col-2'>
            <Input type='text' name='charityName' placeholder='موسسه خیریه'
              onChange={(event) => this.handleChange(event)} />
          </div>
          <div className='col-2'>
            <Form.Control as='select' name='gender'
              onChange={(event) => this.handleChange(event)}>
              <option value=''>جنسیت</option>
              <option value='F'>زن</option>
              <option value='M'>مرد</option>
            </Form.Control>
          </div>
          <div className='col-1'>
            <Input
              type='text' name='age' placeholder='سن'
              value={this.state.age}
              onChange={(e) => this.ageChange(e)}
            />
          </div>
          <div className='col-4'>
            <Input type='text' name='description' placeholder='توضیحات'
              onChange={(event) => this.handleChange(event)} />
          </div>
          <div className='col-1'>
            <Button variant='warning' onClick={() => this.filteredSearch()}>
              <IoMdSearch color='black' />
            </Button>
          </div>
        </div>
        <div className='taskContainer' >
          {
            this.state.taskslist.map((task, index) => {
              return (
                <div key={index}>
                  <Card className='text-right' style={{ margin: '2%' }}>
                    <Card.Header as='h4'>{task.title}
                      {
                        (task.state == 'W' && <Badge variant='warning'>در حال بررسی</Badge>)
                      }
                      {
                        (task.state == 'P' && <Badge variant='info'>قابل انتخاب</Badge>)
                      }
                      {
                        (task.state == 'A' && <Badge variant='success' >تائید شده</Badge>)
                      }
                      {
                        (task.state == 'D' && <Badge variant='dark' >انجام شده</Badge>)
                      }
                    </Card.Header>
                    <Card.Body>
                      <Card.Title> موسسه خیریه: {task.charity.name}</Card.Title>
                      <p > {task.genderName} </p>
                      <p > {task.description} </p>
                      <div className='applyed'>
                        {
                          (task.state == 'P' && <Button variant='primary' className='applybtn'
                            onClick={() => this.taskRequest(task.id)}>
                            اعلام آمادگی
                          </Button>)
                        }
                      </div>
                    </Card.Body>
                  </Card>

                </div>
              )
            })
          }
        </div>
        <Modal show={this.state.show} onHide={() => this.handleClose()} size='sm' id='taskError'>
          <Modal.Header closeButton id='taskerrorHead' >
            <Modal.Body id='taskerrorBody' >
              <span style={{ fontWeight: 'bold' }} > خطا</span> <MdError size='25px' />
            </Modal.Body >
          </Modal.Header>
        </Modal>
      </div >
    )
  }
}
