import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import logo from './img/logo.png'
import './App.css'

import Vacations from './Vacations'

function Home() {
  return (
    <div>
      <h2>Welcome to Meadowlark Travel</h2>
      <ul>
        <li>Check out our "<Link to="/about">About</Link>" page!</li>
        <li>And our <Link to="/vacations">vacations</Link>!</li>
      </ul>
    </div>
  )
}

function About() {
  return (<i>coming soon</i>)
}

function NotFound() {
  return (<i>Not Found</i>)
}

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Meadowlark Travel</h1>
          <Link to="/"><img src={logo} alt="Meadowlark Travel Logo" /></Link>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/vacations" exact component={Vacations} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
