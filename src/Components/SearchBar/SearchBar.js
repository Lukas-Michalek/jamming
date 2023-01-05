import React from "react";
import "./SearchBar.css";

export class SearchBar extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      term: ''
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
   
  };


  // method passes the state of the term to this.props.onSearch
  search(){
    this.props.onSearch(this.state.term);
    
  };

  
  // Sets the state of the search bar’s term to the event target’s value.(there needs to be initial state in constructor first)
  // States can be set within any componenet, not just Main(app.js)

  // handleTermChange is going to be passed an event, so we are going to have an access to whatever is in that input field and specificly we are going to get the value and we are going to set the state of the term to whatever that value is 
  handleTermChange(event){

    this.setState({ term: event.target.value});

  };

  render() {
    return (
      <div className="SearchBar">
        <input 
              placeholder="Enter A Song, Album, or Artist"
              onChange={this.handleTermChange} />
        <button class="SearchButton">SEARCH</button>
      </div>
    );
  }
}
