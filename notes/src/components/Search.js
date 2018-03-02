import React from 'react';
import { connect } from 'react-redux';
import { searchNotes } from '../actions';
import './Search.css';

class Search extends React.Component {
  state = {
    searchTerm: '',
    termToSearch: '',
  }

  onChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchTerm !== '') {
      const terms = this.state.searchTerm.toLowerCase().replace(/[\W_]+/g," ").replace(/\s/g, '');
      this.checkSearch(terms);
      this.props.history.push(`/search/${terms}`);
    } else {
      this.props.history.push('/');
    }
  }

  checkSearch = (terms) => {
    console.log('terms',terms)
    const searchResults = [];
    let looseReg = '';
    for (let i = 0; i < terms.length; i++) {
      looseReg += terms[i] + "\\s*";
    }
    let strictRegex = new RegExp(terms, 'i');
    let looseRegex = new RegExp(looseReg, 'i');
    console.log('search term', looseReg);
    this.props.notes.forEach((item) => {
      if (item.title.match(strictRegex) || item.entry.match(strictRegex)) {
        searchResults.push(item);
      }
    });
    console.log(searchResults);
    this.props.notes.forEach((item) => {
      if (item.title.replace(/[\W_]+/g," ").replace(/\s/g, '').match(looseRegex) || item.entry.replace(/[\W_]+/g," ").replace(/\s/g, '').match(looseRegex)) {
        if (!searchResults.includes(item)){
          searchResults.push(item);
        }
      }
    });
    this.props.searchNotes(searchResults, terms);
  }

  render() {
    return (
      <div className='search'>
        <form onSubmit={this.onSubmit}>
          <label>Search:</label>
          <input className='search-bar' name='searchTerm' onChange={this.onChange}/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

export default connect(mapStateToProps, { searchNotes })(Search);