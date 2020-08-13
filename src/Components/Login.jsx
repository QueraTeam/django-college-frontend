import React from "react";
import { IoMdPerson, IoMdLock } from "react-icons/io";
import axios from 'axios'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                username: '',
                password: ''
            }
        }
    }

    handleChange(event) {
        const name = event.target.name
        const changeFields = this.state.fields
        changeFields[name] = event.target.value
        this.setState({ fields: changeFields })
    }

    handleRequest () {
        axios.post('https://api.paywith.click/auth/signin/', { 
          username: this.state.fields.username,
          password: this.state.fields.password
        })
          .then((response) => {
            window.localStorage.setItem('token', response.data.data.token)
            window.localStorage.setItem('id', response.data.data.profile.id)
           // this.props.history.push('/page/')
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    render() {

        console.log('chnge', this.state.fields)
        return (
            <div className='enter-container'>
                <div className='user-icon'>
                    <IoMdPerson className="icon" size="8%" color='white' />
                    <input type='text' placeholder='نام کاربری'
                        name='username'
                        className='username'
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <div className='user-icon'>
                    <IoMdLock className="icon" size="8%" color='white' />
                    <input type='password' placeholder='رمز عبور'
                        name='password'
                        className='username'
                        onChange={(event) => this.handleChange(event)}
                    />
                </div>
                <button className='logbtn' onClick={() => this.handleRequest()} >ورود</button>
            </div>
        )
    }
}
