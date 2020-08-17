import React from 'react'
import { Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Authentication from './Pages/authentication'

export default class App extends React.Component {
   
  render() {
    
    return (
      <div >
        <Route exact path='/' component={Authentication} />

        
      </div>
    )
  }
}
