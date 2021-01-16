import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import Container from '../components/Container';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import Alert from '../components/Alert';

const Search = props => {
  // we can do individual state handling or handle it like an object in discover.
  const [search, setSearch] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.getBaseBreedsList()
      .then(res => setBreeds(res.data.message))
      .catch(err => console.log(err));
    // only on mount dependency array is empty
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(search)
      .then(res => {
        if (res.data.status === 'error') {
          throw new Error(res.data.message);
        }

        setResults(res.data.message);
        setError('');
      })
      .catch(err => setError(err.message));
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <div>
      <Container style={{ minHeight: '80%' }}>
        <h1 className="text-center">Search By Breed!</h1>
        <Alert
          type="danger"
          style={{ opacity: error ? 1 : 0, marginBottom: 10 }}>
          {error}
        </Alert>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          breeds={breeds}
        />
        <SearchResults results={results} />
      </Container>
    </div>
  );
};

export default Search;
