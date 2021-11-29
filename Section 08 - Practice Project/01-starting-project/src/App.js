import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);

  function addUserHandler(userName, userAge) {
    setUsersList((previousState) => [
      ...previousState,
      { name: userName, age: userAge, id: Math.random().toString() },
    ]);
  }

  return (
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </React.Fragment>
  );
}

export default App;
