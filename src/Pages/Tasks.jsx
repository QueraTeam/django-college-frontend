import React from 'react'
import Navbar from '../Components/Navbar'
import { Input } from 'reactstrap'
import { Button, Form } from 'react-bootstrap'
import { IoMdSearch } from 'react-icons/io'
import axios from 'axios'

export default class Tasks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: {
        title: '',
        charityName: '',
        gender: '',
        age: '',
        description: ''
      },
      buttenText: 'اعلام آمادگی',
      buttenVariant: 'warning',
      taskslist: []

    }
  }

  componentDidMount () {
    const getToken = window.localStorage.getItem('token')
    console.log('tokenlog', getToken)
    axios.get('http://localhost:8000/tasks/?title=&charity=&gender=&age=&description', {
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

  handleChange (event) {
    const name = event.target.name
    const changeFields = this.state.fields
    changeFields[name] = event.target.value
    this.setState({ fields: changeFields })
  }

  filteredSearch () {
    const getToken = window.localStorage.getItem('token')
    let a = 'http://localhost:8000/tasks/?title='
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
    a += '&'
    if (this.state.fields.description) {
      a += this.state.fields.description
    }

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

  render () {
    return (
      <div className='taskPage' dir='rtl'>
        <Navbar />
        <div className='searchBar'>
          <Input type='text' name='title' placeholder='موضوع'
            onChange={(event) => this.handleChange(event)}
          />
          <Input type='text' name='charityName' placeholder='موسسه خیریه'
            onChange={(event) => this.handleChange(event)} />
          <Form.Control as='select' name='gender'
            onChange={(event) => this.handleChange(event)}>
            <option value='female'>زن</option>
            <option value='male'>مرد</option>
          </Form.Control>
          <Input type='text' name='age' placeholder='سن'
            onChange={(event) => this.handleChange(event)} />

          <Input type='text' name='description' placeholder='توضیحات'
            onChange={(event) => this.handleChange(event)} />
          <Button variant='warning' onClick={() => this.filteredSearch()}>
            <IoMdSearch size='30%' color='black' />
             جستجو
          </Button>
        </div>
        <div className='taskContainer' >
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
    )
  }
}
