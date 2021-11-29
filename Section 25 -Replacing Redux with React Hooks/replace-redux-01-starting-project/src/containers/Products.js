import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
// import { ProductsContext } from '../context/products-context';

// Access to our custom global store and dispatch
import { useStore } from '../hooks-store/store';

const Products = (props) => {
  // const productList = useContext(ProductsContext).products;
  // const productList = useSelector((state) => state.shop.products);

  const [state, dispatch] = useStore();
  // const { products: productList } = state;

  return (
    <ul className='products-list'>
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
