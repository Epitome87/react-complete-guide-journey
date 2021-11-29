import React, { createContext, useState } from 'react';

export const ProductsContext = createContext({
  products: [],
  toggleFavorite: (id) => {},
});

const ProductsContextProvider = (props) => {
  const [productsList, setProductsList] = useState([
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false,
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false,
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false,
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = (productId) => {
    setProductsList((currentProductList) => {
      return currentProductList.map((product) => {
        return product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product;
      });
    });
  };

  return (
    <ProductsContext.Provider
      value={{ products: productsList, toggleFavorite }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
