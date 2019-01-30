import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: ''
    }
  }

  handleUserInput = (value) => {
    this.setState({userInput: value});
  }

  search = () =>{
    this.props.runFn(this.state.userInput);
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input value={this.state.userInput} 
            onChange={(e) => this.handleUserInput(e.target.value)}
            placeholder="Search Your Feed" />

          <SearchIcon id="Search__icon" onClick={this.search} />
        </div>
        
      </section>
    )
  }
}