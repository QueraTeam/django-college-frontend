import React, { Component } from 'react'
import Calendar from 'react-calendar'
import Moment from 'moment'
import 'react-calendar/dist/Calendar.css'

export default class MyCalender extends Component {
  state = {
    date: new Date()
  }

  onChange = (date) => {
    console.log(Moment(date).format('YYYY-MM-DD'))
    this.setState({ date })
    this.props.calenderDateChange(Moment(date).format('YYYY-MM-DD'))
  }

  render() {
    return (
      <div>
        <Calendar onChange={this.onChange} value={this.state.date} />
      </div>
    )
  }
}
