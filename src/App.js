import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <Router>
        <div>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <NavBar />
          <Routes>
            <Route strict path="/" element={<News setProgress={this.setProgress} key=" general" pageSize={9} category="general" />} />
            <Route strict path="/entertainment" element={<News setProgress={this.setProgress} key=" entertainment" pageSize={9} category="entertainment" />} />
            <Route strict path="/technology" element={<News setProgress={this.setProgress} key=" technology" pageSize={9} category="technology" />} />
            <Route strict path="/sports" element={<News setProgress={this.setProgress} key=" sports" pageSize={9} category="sports" />} />
            <Route strict path="/science" element={<News setProgress={this.setProgress} key=" science" pageSize={9} category="science" />} />
            <Route strict path="/health" element={<News setProgress={this.setProgress} key=" health" pageSize={9} category="health" />} />
            <Route strict path="/business" element={<News setProgress={this.setProgress} key=" business" pageSize={9} category="business" />} />
            <Route strict path="/general" element={<News setProgress={this.setProgress} key=" general" pageSize={9} category="general" />} />
          </Routes>
        </div>
      </Router>
    )
  }
}
