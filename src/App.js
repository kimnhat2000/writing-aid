import React, { Component } from 'react';

import WritingAidMain from './components/MainPage' ;
import "semantic-ui-css/semantic.min.css";
import './globalStyle.css';

class App extends Component {
  render() {
    return (
      <div>
        <WritingAidMain/>
      </div>
    );
  }
}

export default App;
