import React, { useEffect } from 'react';
import API from '../utils/API';
import { useGlobalState } from '../context';
import Container from '../components/Container';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Alert from '../components/Alert';

const Search = props => {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    API.getBaseBreedsList()
      .then(res => dispatch({ type: 'GET_BREEDS', breeds: res.data.message }))
      .catch(err => console.log(err));
    // only on mount dependency array is empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
