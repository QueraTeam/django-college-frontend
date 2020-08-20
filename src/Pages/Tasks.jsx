import React from 'react'
import Navbar from '../Components/Navbar'
import { Input } from 'reactstrap'
import { Button } from 'react-bootstrap'
import { IoMdSearch } from 'react-icons/io'
import axios from 'axios'


export default class Tasks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        title: '',
        charityName: '',
        age:'',
        gender:'',
        description:''
      },
      buttenText: 'اعلام آمادگی',
      buttenVariant: 'warning',
      taskslist: []

    }
  }

  componentDidMount() {
    const getToken = window.localStorage.getItem('token')
    console.log('tokenlog', getToken)
    axios.get('http://localhost:8000/tasks/?title=&charity=&gender=&age=&description', {
      headers: {
        'Authorization': `Token ${getToken}`
      },
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

  /*filteredSearch() { 
  let a = 'http://localhost:8000/tasks/?title=';
    if (this.state.fields.title) {
      a +=;
    }
    a += '&charity='
    if (ch) {
      a += ch
    }
  } */
  render() {
    console.log('chnge', this.state.fields)


    return (
      <div className='taskPage' dir='rtl'>
        <Navbar />
        <div className='searchBar'>
          <Input type='text' name='title' placeholder='موضوع'
            onChange={(event) => this.handleChange(event)}
          />
          <Input type='text' name='charityName' placeholder='موسسه خیریه'
            onChange={(event) => this.handleChange(event)} />
          <Input type='text' name='age' placeholder='سن'
            onChange={(event) => this.handleChange(event)} />

          <select name='gender' 
           onChange={(event) => this.handleChange(event)}>
            <option value='female'>زن</option>
            <option value='male'>مرد</option>
          </select>
          <Input type='text' name='description' placeholder='توضیحات'
            onChange={(event) => this.handleChange(event)} />
          <Button variant="warning">
            <IoMdSearch size='30%' color='black' />
             جستجو
          </Button>
        </div>
        <div className='taskContainer' >
          {
            this.state.taskslist.map((task, index) => {
              return (
                <div className="task-partition" key={index}>
                  <h3 className="task-header">
                    {task.title}
                  </h3>
                  <div className='taskbar'>
                    <div className="requirements">
                        <p className="req-element">
                          {task.charity.name}
                        </p>
                        <p className="req-element">
                          {task.gender_limit}
                        </p>
                        <p className="req-element">
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
