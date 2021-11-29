import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../context/auth-context';

// Using Consumer for Context
// const Navigation = (props) => {
//   return (
//     <AuthContext.Consumer>
//       {(contextData) => {
//         return (
//           <nav className={classes.nav}>
//             <ul>
//               {contextData.isLoggedIn && (
//                 <li>
//                   <a href='/'>Users</a>
//                 </li>
//               )}
//               {contextData.isLoggedIn && (
//                 <li>
//                   <a href='/'>Admin</a>
//                 </li>
//               )}
//               {contextData.isLoggedIn && (
//                 <li>
//                   <button onClick={props.onLogout}>Logout</button>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         );
//       }}
//     </AuthContext.Consumer>
//   );
// };

const Navigation = () => {
  const contextData = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {contextData.isLoggedIn && (
          <li>
            <a href='/'>Users</a>
          </li>
        )}
        {contextData.isLoggedIn && (
          <li>
            <a href='/'>Admin</a>
          </li>
        )}
        {contextData.isLoggedIn && (
          <li>
            <button onClick={contextData.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
