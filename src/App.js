import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

import logo from './logo.svg';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet
          title="title"
          bodyAttributes={{
            class: 'page-partner'
          }}
          meta={[{
            property: 'og:title',
            content: 'title'
          }, {
            property: 'og:type',
            content: 'website'
          }, {
            property: 'og:image',
            content: logo
          }, {
            property: 'og:url',
            content: `${process.env.PROTOCOL}://${process.env.HOST || `localhost:${process.env.PORT || 3000}`}`
          }, {
            property: 'og:description',
            content: 'description'
          }, {
            property: 'og:image:width',
            content: '300'
          }, {
            property: 'og:image:height',
            content: '300'
          }]}
        />

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
