import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import Card from '../components/Card';
import Alert from '../components/Alert';

const Discover = props => {
  const [discover, setDiscover] = useState({
    image: '',
    match: false,
    matchCount: 0
  });

  const loadNextDog = () => {
    console.log(discover);
    API.getRandomDog()
      .then(res => setDiscover({ ...discover, image: res.data.message }))
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
    // Clone this.state to the newState object
    // We'll modify this object and use it to set our component's state
    const newState = discover;

    if (btnType === 'pick') {
      // Set newState.match to either true or false depending on whether or not the dog likes us (1/5 chance)
      newState.match = 1 === Math.floor(Math.random() * 5) + 1;
      // Set newState.matchCount equal to its current value or its current value + 1 depending on whether the dog likes us
      newState.matchCount = newState.match
        ? newState.matchCount + 1
        : newState.matchCount;
    } else {
      // If we thumbs down'ed the dog, we haven't matched with it
      newState.match = false;
    }
    // Replace our component's state with newState, load the next dog image
    setDiscover(newState);
    loadNextDog();
  };

  return (
    <div>
      <h1 className="text-center">Make New Friends</h1>
      <h3 className="text-center">Thumbs up on any pups you'd like to meet!</h3>
      <Card image={discover.image} handleBtnClick={handleBtnClick} />
      <h1 className="text-center">
        Made friends with {discover.matchCount} pups so far!
      </h1>
      <Alert style={{ opacity: discover.match ? 1 : 0 }} type="success">
        Yay! That Pup Liked You Too!!!
      </Alert>
    </div>
  );
};

export default Discover;
