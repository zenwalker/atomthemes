import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styles/base.css';
import './styles/container.css';

import ThemeList from './components/ThemeList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <ThemeList />
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
