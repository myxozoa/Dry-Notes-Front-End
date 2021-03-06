const NotesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOADING_NOTES':
            return { ...state, loading: true };
        case 'ADD_NOTE':
            return { ...state, notes: state.notes.concat(action.payload), loading: false };

        case 'VIEW_NOTE':
            return { ...state, current: action.payload, loading: false };

        case 'EDIT_NOTE':
            return {
                ...state,
                notes: state.notes.map(note => {
                    if (note.id === action.payload.id) {
                        return action.payload;
                    }
                    return note;
                }),
                 loading: false
            };

        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload), loading: false
            };

        case 'REORDER_NOTES':
            if (action.searching) {
                return { ...state, searchResults: action.payload };
            }
            return { ...state, notes: action.payload };

        case 'SEARCH_NOTES':
            return {
                ...state,
                searchResults: action.payload,
                searchTerms: action.searchTerms,
                searching: true,
                loading: false
            };

        case 'SORT_NOTES':
            if (action.searching) {
                return {
                    ...state,
                    searchResults: action.payload,
                    direction: action.direction,
                    hash: action.hash,
                };
            }
            return {
                ...state,
                notes: action.payload,
                direction: action.direction,
                hash: action.hash,
            };

        case 'CHANGE_NOTE_LABEL':
            return {
                ...state,
                notes: state.notes.map(note => {
                    console.log('test: ', note);
                    if (note._id === action.id) {
                        return { ...note, label: action.payload };
                    }
                    return note;
                }),
            };

        case 'GOT_NOTES':
            return {
              ...state, notes: action.payload, current: {}, loading: false, searching: false
            };

        case 'FLUSH_NOTES':
        sessionStorage.removeItem('reduxState');
        return {};

        default:
            return state;
    }
};

export default NotesReducer;
