import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Authentication from './Pages/authentication';

 class App extends React.Component {
   
  render() {
    
    return (
      <div >
        <Route exact path="/" component={Authentication} />
        
      </div>
    );
  }
}
export default App;
