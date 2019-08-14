import React, { useReducer, useEffect } from 'react';
import API from '../utils/API';
import Container from '../components/Container';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Alert from '../components/Alert';

// define the initial state data
const INITIAL_STATE = {
  search: '',
  error: '',
  breeds: [],
  results: []
};

// create reducer function takes in current state object and action object
const reducer = (state, action) => {
  // define types of actions in switch
  switch (action.type) {
    case 'GET_BREEDS':
      return { ...state, error: '', breeds: action.breeds };
    case 'GET_RESULTS':
      return { ...state, results: action.results };
    case 'ERROR':
      return { ...state, search: '', error: action.error };
    case 'SEARCH':
      return { ...state, search: action.search };
    default:
      throw new Error();
  }
};

const Search = props => {
  // destructure state and dispatch function from useReducer hook that takes 2 arguments
  // the reducer function above and the initial state object
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    API.getBaseBreedsList()
      .then(res => dispatch({ type: 'GET_BREEDS', breeds: res.data.message }))
      .catch(err => console.log(err));
    // only on mount dependency array is empty
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(state.search)
      .then(res => {
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }
        dispatch({
          type: 'GET_RESULTS',
          results: res.data.message
        });
      })
      .catch(err => dispatch({ type: 'ERROR', error: err.message }));
  };

  const handleInputChange = event => {
    const { value } = event.target;
    dispatch({ type: 'SEARCH', search: value });
  };

  return (
    <div>
      <Container style={{ minHeight: '80%' }}>
        <h1 className="text-center">Search By Breed!</h1>
        <Alert
          type="danger"
          style={{ opacity: state.error ? 1 : 0, marginBottom: 10 }}>
          {state.error}
        </Alert>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          search={state.search}
          breeds={state.breeds}
        />
        <SearchResults results={state.results} />
      </Container>
    </div>
  );
};

export default Search;
