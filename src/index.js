import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './pollstyle.css';
import $ from 'jquery';
import Textarea from 'react-expanding-textarea';

class Handler extends React.Component {
  constructor() {
    super();
    this.state = { createPoll: false };
    this.state = {
      question: '',
      options: [{ option: ''}, { option: ''}, { option: ''}], 
    };

    this.handleAddOption=this.handleAddOption.bind(this)
    this.handleNameChange=this.handleNameChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  
  handleNameChange(e) {
    this.setState({ question: e.target.value });
  }
  
  handleOptionNameChange = (idx) => (e) => {
    const newOptions = this.state.options.map((option, sidx) => {
      if (idx !== sidx) return option; //without it all inputs would have same value
      return { ...option, option: e.target.value }; //...option is unessecary?
    });
    
    this.setState({ options: newOptions });
  }
  
  handleSubmit(e) {
    e.preventDefault()
    this.setState({ createPoll: true })
    this.setState({ options: this.state.options.filter(s => s.option !== '') })
  }
  
  handleAddOption(e) {
    this.setState({ options: this.state.options.concat([{ option: '' }]) });
  }
  
  componentDidMount() {
    $("input:last").click(this.handleAddOption)
  }

  componentDidUpdate() {
    $("input").off("click")
    $("input:last").click(this.handleAddOption)
  }

  render() {
    return (
      !this.state.createPoll 
      ? <Pollcreator 
      handleSubmit = {this.handleSubmit}
      question = {this.state.question}
      handleNameChange = {this.handleNameChange}
      options = {this.state.options}
      handleOptionNameChange = {this.handleOptionNameChange}
      />
      : <Poll 
          question = {this.state.question}
          options = {this.state.options}
      />
    )
  }
}

class Pollcreator extends React.Component {
  render() {
    return (
       <form className="pollinput" onSubmit={this.props.handleSubmit}>
        <Textarea
          className="textbox"
          type="text"
          placeholder="Ask something..."
          value={this.props.question}
          onChange={this.props.handleNameChange}
        />
        {this.props.options.map((option, idx) => (
          <div className="pollInputArea">
            <input
              className="input"
              type="text"
              id={`#${idx +1}`}
              placeholder="Add an option..."
              value={option.msg}
              onChange={this.props.handleOptionNameChange(idx)}
            />
          </div>
        ))}
        <div className="buttonArea">
          <button className="post">Post</button>
        </div>
      </form>
    )
  }
}

class Poll extends React.Component {
  constructor() {
    super();

    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    return (
     <form className="">
        <Textarea className="question"
          type="text"
          value={this.props.question}
        />
        {this.props.options.map((option, idx) => (
          <div>
            <button type="text" id={`#${idx +1}`} onClick={this.handleClick} className="option">
            {option.option}
            </button>
          </div>
        ))}
      </form>
    )
  }
}

ReactDOM.render(<Handler />, root);

registerServiceWorker();