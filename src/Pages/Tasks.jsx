import React from 'react'
import Navbar from '../Components/Navbar'
import { Input } from 'reactstrap'
import { Button, Form, Card, Badge, Modal } from 'react-bootstrap'
import { IoMdSearch } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import axios from 'axios'

export default class Tasks extends React.Component {
  state = {
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
    regexp: /^[0-9\b]+$/,
    show: false
  }

  componentDidMount() {
    const getToken = window.localStorage.getItem('token')
    console.log('search', this.props.location.search)
    const params = new URLSearchParams(this.props.location.search)
    params.get('title')
    params.get('charity')
    params.get('gender')
    params.get('age')
    params.get('description')
    let config = {
      headers: { 'Authorization': `Token ${getToken}` },
      params: {
        title: params.get('title'),
        charity: params.get('charity'),
        gender: params.get('gender'),
        age: params.get('age'),
        description: params.get('description')
      }
    }

    axios.get('http://localhost:8000/tasks?', config)
      .then((response) => {
        console.log('hhhh', response.data)
        response.data.map((task) => {
          if (task.gender_limit == 'F') {
            task.genderName = 'جنسیت: زن'
          } if (task.gender_limit == 'M') {
            task.genderName = 'جنسیت: مرد'
          } if (task.gender_limit == 'MF') {
            task.genderName = 'جنسیت: هردو'
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
    if (age == '' || this.state.regexp.test(age)) {
      this.setState({ ...this.state, fields: { ...this.state.fields, age: age } })
    }
  }

  filteredSearch() {
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks?title='
    if (this.state.fields.title) {
      a += this.state.fields.title
    }
    a += '&charity='
    if (this.state.fields.charityName) {
      a += this.state.fields.charityName
    }
    a += '&gender='
    if (this.state.fields.gender) {
      a += this.state.fields.gender
    }
    a += '&age='
    if (this.state.fields.age) {
      a += this.state.fields.age
    }
    a += '&description='
    if (this.state.fields.description) {
      a += this.state.fields.description
    }
    let b = a.slice(21)
    axios.get(a, {
      headers: {
        'Authorization': `Token ${getToken}`
      }
    })
      .then((response) => {
        this.props.history.push(b)
        response.data.map((task) => {
          if (task.gender_limit == 'F') {
            task.genderName = 'جنسیت: زن'
          } if (task.gender_limit == 'M') {
            task.genderName = 'جنسیت: مرد'
          } if (task.gender_limit == 'MF') {
            task.genderName = 'جنسیت: هردو'
          }
        })
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
              <option value='MF'>جنسیت</option>
              <option value='F'>زن</option>
              <option value='M'>مرد</option>
            </Form.Control>
          </div>
          <div className='col-1'>
            <Input
              type='text' name='age' placeholder='سن'
              value={this.state.fields.age}
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
                  <Card className='text-right' id='taskCard'>
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
                      <p> {task.genderName} </p>
                      <p> {task.description} </p>
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
              <span style={{ fontWeight: 'bold' }} > خطا </span>
              <MdError size='25px' />
            </Modal.Body >
          </Modal.Header>
        </Modal>
      </div >
    )
  }
}
