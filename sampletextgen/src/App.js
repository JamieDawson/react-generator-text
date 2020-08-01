import React, {Component} from 'react';
import './App.css';
import Output from './Components/output';
import Select from './Components/Controls/select';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paras: 1,
      html: true,
      text: '',
    };
  }

  componentDidMount() {
    this.getSampleText();
  }

  getSampleText() {
    axios
      .get(
        'https://baconipsum.com/api/?type=all-meat&paras=' +
          this.state.paras +
          '&format=json'
      )
      .then((response) => {
        console.log(response);
        this.setState({text: response.data}, function () {
          console.log(this.state);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showHtml(x) {
    this.setState({html: x}, this.getSampleText);
  }

  render() {
    return (
      <div className='App container'>
        <h1>ReactJS Sample Text Generator</h1>
        <hr />
        <form class='form-inline'>
          <div class='form-group'>
            <label>IncludeHTML: </label>
            <Select
              value={this.state.html}
              onChange={this.showHtml.bind(this)}
            />
          </div>
        </form>
        <Output value={this.state.text} />
      </div>
    );
  }
}

export default App;
