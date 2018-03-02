import React from 'react';
import { connect } from 'react-redux';
import { sortNotes } from '../actions';

class SortingMenu extends React.Component {
  state = {
    value: this.props.sorting,
  }

  onChange = (event) => {
    this.setState({value: event.target.value});
    this.sortByDate(event.target.value);
  }

  sortByDate = (order) => {
    const notesToSort = this.props.notes;
    switch (order) {
      case 'oldest':
        const sortedNotesOldest = notesToSort.sort((a, b) => {
          return Date.parse(a.dateCreated) - Date.parse(b.dateCreated);
        });
        console.log(sortedNotesOldest);
        this.props.sortNotes(sortedNotesOldest, 'oldest');
        break;

      case 'newest':
        const sortedNotesNewest = notesToSort.sort((a, b) => {
          return Date.parse(b.dateCreated) - Date.parse(a.dateCreated);
        });
        console.log(sortedNotesNewest);
        this.props.sortNotes(sortedNotesNewest, 'newest');
        break;

      case 'title_a-z':
        const sortedNotesAlpha = notesToSort.sort((a, b) => {
          const aye = a.title.toUpperCase();
          const bee = b.title.toUpperCase();

          if (aye < bee) return -1;
          if (aye > bee) return 1;
          return 0;
        });
        console.log(sortedNotesAlpha);
        this.props.sortNotes(sortedNotesAlpha, 'title_a-z');
        break;


      case 'title_z-a':
        const sortedNotesAlphaRev = notesToSort.sort((a, b) => {
          const hey = a.title.toUpperCase();
          const bey = b.title.toUpperCase();

          if (hey < bey) return 1;
          if (hey > bey) return -1;
          return 0;
        });
        console.log(sortedNotesAlphaRev);
        this.props.sortNotes(sortedNotesAlphaRev, 'title_z-a');
        break;

      default:
        return this.props.notes;
    }
  }

  render() {

    return (
      <div className='sorting-menu-container'>
        <form>
          <select value={this.props.sorted ? this.props.sorted : this.state.value} onChange={this.onChange}>
            <option value='default'>Sort by</option>
            <option value='newest'>Sort by Newest</option>
            <option value='oldest'>Sort by Oldest</option>
            <option value='title_a-z'>Sort by Title A-Z</option>
            <option value='title_z-a'>Sort by Title Z-A</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
    sorted: state.sorted,
  };
}

export default connect(mapStateToProps, { sortNotes })(SortingMenu);