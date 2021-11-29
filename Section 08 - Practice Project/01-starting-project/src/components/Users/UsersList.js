import React from 'react';
import styles from './UsersList.module.css';
import Card from '../UI/Card';

function UsersList(props) {
  console.log(props.users);
  return (
    <Card className={styles.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
}
export default UsersList;
