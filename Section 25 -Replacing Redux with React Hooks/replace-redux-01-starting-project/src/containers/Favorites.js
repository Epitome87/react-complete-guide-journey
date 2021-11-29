import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';
import { ProductsContext } from '../context/products-context';
// import productReducer from '../store/reducers/products';

import { useStore } from '../hooks-store/store';

const Favorites = (props) => {
  // Using Redux
  // const favoriteProducts = useSelector(state =>
  //   state.shop.products.filter(p => p.isFavorite)
  // );

  // Using Context
  // const productsContext = useContext(ProductsContext);
  // const favoriteProducts = productsContext.products.filter(
  //   (product) => product.isFavorite
  // );

  // Using our custom store hook
  const [state, dispatch] = useStore();
  const favoriteProducts = state.products.filter(
    (product) => product.isFavorite
  );

  let content = <p className='placeholder'>Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className='products-list'>
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
