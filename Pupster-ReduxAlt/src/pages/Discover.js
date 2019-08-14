import React, { useEffect } from 'react';
import { useGlobalState } from '../context';
import API from '../utils/API';
import Container from '../components/Container';
import Card from '../components/Card';
import Alert from '../components/Alert';

const Discover = props => {
  const [state, dispatch] = useGlobalState();

  const loadNextDog = () => {
    API.getRandomDog()
      .then(res => dispatch({ type: 'SET_IMAGE', image: res.data.message }))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadNextDog();
    // we have to disable the dependency array here or else vscode will auto fill it.
    // we only want loadNextDog to be called on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBtnClick = event => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem('data-value').value;

    if (btnType === 'pick') {
      const isMatch = 1 === Math.floor(Math.random() * 5) + 1;
      if (isMatch) {
        dispatch({ type: 'LIKE' });
      } else {
        dispatch({ type: 'DISLIKE' });
      }
    } else {
      // If we thumbs down'ed the dog, we haven't matched with it
      dispatch({ type: 'DISLIKE' });
    }
    // Replace our component's state with newState, load the next dog image
    loadNextDog();
  };

  return (
    <Container>
      <h1 className="text-center">Make New Friends</h1>
      <h3 className="text-center">Thumbs up on any pups you'd like to meet!</h3>
      <Card image={state.image} handleBtnClick={handleBtnClick} />
      <h1 className="text-center">
        Made friends with {state.matchCount} pups so far!
      </h1>
      <Alert style={{ opacity: state.match ? 1 : 0 }} type="success">
        Yay! That Pup Liked You Too!!!
      </Alert>
      <div className="row">
        {state.matches.length ? (
          state.matches.map((image, index) => (
            <div key={index} className="col-md-4 col-12">
              <img className="img-fluid" src={image} alt="dog" />
            </div>
          ))
        ) : (
          <div className="col-12">
            <h1 className="text-center">No Matches Yet</h1>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Discover;
