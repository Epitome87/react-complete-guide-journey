import React from 'react';

import Card from './Card';
import useCounter from '../hooks/useCounter';

const ForwardCounter = () => {
  const counter = useCounter(1);

  return <Card>{counter}</Card>;
};

export default ForwardCounter;
