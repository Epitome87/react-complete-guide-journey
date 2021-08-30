import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  // True since when this first loads we will want to be loading
  const [isLoading, setIsLoading] = useState(true);

  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-b5854-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong fetching meal data!');
      }

      const responseData = await response.json(); // This is an object, we want array

      if (!responseData) {
        throw new Error('Something went wrong reading our meal data!');
      }

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    // Can use .catch (instead of try-catch) since fetchMeals returns a Promise
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem key={meal.id} meal={meal} id={meal.id} />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>{' '}
      </Card>
    </section>
  );
}

export default AvailableMeals;
