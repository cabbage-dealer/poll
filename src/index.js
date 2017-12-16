import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import $ from 'jquery';
import Textarea from 'react-expanding-textarea';

class Poll extends React.Component {
  constructor() {
    super();
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
    console.log(this.state.options)
  }
  
  handleSubmit(e) {
    const { question, options } = this.state;
    console.log(`Poll: ${question} with ${options} options`)
    console.log(options);
  }
  
  handleAddOption(e) {
    this.setState({ options: this.state.options.concat([{ option: '' }]) });
  }
  
 /* handleRemoveOption = (idx) => () => {
    //if(idx>=3) {
    console.log(idx)
    console.log(this.state.options.sidx)
    this.setState({ options: this.state.options.filter((s, sidx) => idx !== sidx) });
    //}
  }*/
  componentDidMount() {
    $("input:last").click(this.handleAddOption)
  }

  componentDidUpdate() {
    $("input").off("click")
    $("input:last").click(this.handleAddOption)
  }

/*// Delete this
if(!this.state.polls){
  render()
} else {
  dontRender()
}

{
  {!this.state.polls ? <MyComponent > : dontRender()}
}

// Until here*/

  render() { 
    return (
      <form className="poll" onSubmit={this.handleSubmit}>
        <Textarea
          className="textbox"
          type="text"
          placeholder="Ask something..."
          value={this.state.question}
          onChange={this.handleNameChange}
        />
        {this.state.options.map((option, idx) => (
          <div className="pollInputArea">
            <input
              type="text"
              id={`#${idx +1}`}
              placeholder="Add an option..."
              value={option.msg}
              onChange={this.handleOptionNameChange(idx)}
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

ReactDOM.render(<Poll />, root);

registerServiceWorker();