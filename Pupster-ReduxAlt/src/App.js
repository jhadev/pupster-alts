import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Discover from './pages/Discover';
import About from './pages/About';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import { Global } from './context';

const INITIAL_STATE = {
  image: '',
  match: false,
  matchCount: 0,
  search: '',
  error: '',
  breeds: [],
  results: [],
  matches: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LIKE':
      return {
        ...state,
        match: true,
        matchCount: state.matchCount + 1,
        matches: [...state.matches, state.image]
      };
    case 'DISLIKE':
      return { ...state, match: false };
    case 'SET_IMAGE':
      return { ...state, image: action.image };
    case 'GET_BREEDS':
      return { ...state, error: '', breeds: action.breeds };
    case 'GET_RESULTS':
      return { ...state, results: action.results };
    case 'ERROR':
      return { ...state, search: '', error: action.error };
    case 'SEARCH':
      return { ...state, search: action.search };
    case 'RESET':
      return INITIAL_STATE;
    default:
      throw new Error();
  }
};

const App = () => {
  return (
    <Global initialState={INITIAL_STATE} reducer={reducer}>
      <Router>
        <div>
          <Navbar />
          <Wrapper>
            <Route exact path="/" component={About} />
            <Route exact path="/about" component={About} />
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/search" component={Search} />
          </Wrapper>
          <Footer />
        </div>
      </Router>
    </Global>
  );
};

export default App;
