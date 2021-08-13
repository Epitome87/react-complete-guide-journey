import { useState } from 'react'; // All React Hooks start with "use" -- must only be used/called in React Components

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

function ExpenseItem(props) {
  return (
    <li>
      <Card className='expense-item'>
        <ExpenseDate date={props.date} />
        <div className='expense-item__description'>
          <h2>{props.title}</h2>
        </div>
        <div className='expense-item__price'>${props.amount}</div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
