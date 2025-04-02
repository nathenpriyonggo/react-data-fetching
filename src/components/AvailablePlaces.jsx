import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './ErrorPage.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/placess');
        const resData = await response.json();

        if (!response.ok) { // 400, 500
          throw new Error(`Failed to fetch places`);
        }

        setAvailablePlaces(resData.places);
      } catch(error) {
        setError({message: error.message || 'Could not fetch places, please try again later.'});
      }
      
      setIsFetching(false);
    }

    fetchPlaces();
    // fetch('http://localhost:3000/places')
    // .then((response) => {
    //   return response.json();  
    // })
    // .then((resData) => {
    //   setAvailablePlaces(resData.places);
    // });
  }, []);
  

  if (error) {
    return (
      <ErrorPage 
        title="An error occured!"
        message={error.message}>
      </ErrorPage>
    )
      
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
