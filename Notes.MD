## Table of Contents

- [Section 6](#section-6-styling-react-components)
- [Section 7](#section-7-debugging-react-apps)
- [Section 8](#section-8-practice-project)
- [Section 9](#section-9-fragments-portals-and-refs)
- [Section 10](#section-10-effects-reducers-and-context)
- [Section 11](#section-11-food-order-app)
- [Section 12](#section-12-behind-the-scenes-look-at-react-and-optimization-techniques)
- [Section 13](#section-13-class-based-components)
- [Section 14](#section-14-class-based-components)
- [Section 15](#section-15-building-custom-react-hooks)
- [Section 16](#section-16-working-with-forms-and-user-input)
- [Section 17](#section-17-practice-project-adding-http-and-forms-to-the-food-order-app)
- [Section 18](#section-18-redux-an-alternative-to-the-context-api)
- [Section 19](#section-19-advanced-redux)
- [Section 20](#section-20-building-a-multi-page-spa-w-react-router)
- [Section 21](#section-21-deploying-react-apps)
- [Section 22](#section-22-adding-authentication-to-react-apps)
- [Section 23](#section-23-a-pretty-deep-dive-introduction-to-nextjs)

## Section 6: Styling React Components

7/12/21

- Can use Inline Styles just like we would in an HTML file, as follows: `style={ {color: "red", border: "2px solid blue"}}` Note how we use the typical JSX brackets for dynamic values, as well as another bracket representing an object. This is because the style property expects an object, with the keys being styling properties and the values being the desired css value.
- Learning 3 ways to style React components: 1) Inline styles. 2) Using styled-components package. 3) Using CSS Modules.
- For Inline Styles that we need to be dynamic, we could use a ternary operator, as follows: `style={{color: isValid ? "blue" : "red"}}`
- Inline Styles have the highest CSS precedence, so we should use classes instead. Rather than the previous examples, we could create an "isValid" class, style it in a regular CSS file, and then add it dynamically to a React element like this: className={`form-control ${isValid ? "blue" : "red"}` }
- Using the styled-components package to style components to local scope
- TODO: Research tagged template literals!\*
- Styled-components are done as follows: const Button = styled.button` <paste your CSS in here, but remove the class/element names, and for psuedo-selectors do &:focus, &:hover, etc>`
- Styled-components: Add dynamic styles by passing a prop through the Component. Example: `<FormControl invalid={!isValid}>` and then in the tagged template literal: `const FormControl = styled.div margin: 0.5rem 0; & label { color: ${(props) => (props.invalid ? 'red' : 'black')}; }`
- In Styled-components, simply type media queries like you would in a CSS file, but in the tagged template literal! The only difference is we drop the selector name.
- React projects created with create-react-app support CSS Modules; probably the best method for styling components with local scope!
- Simply import CSS file with a name like: `import styles from './Button.modules.css'` rather than the typical way: `import './Button.css'`. We have to rename our .css file with ".module" at the end to signal that we are wanting CSS Module functionality.
- And to use the styles, simply do as such: `<div className={styles.formControl} </div>`. Or if your CSS styling name is not a property JS syntax (such as using a hyphen) do as follows: `<div className={styles['form-control']}</div>`. If you need to add a dynamic class name as well, use a string literal like this: `className={'${styles['form-control']} ${!isValid && styles.invalid}'}`

## Section 7: Debugging React Apps

- Use breakpoints in the browser inspector to step through areas where you want to inspect for bugs.
- React DevTools. This extension adds a Profiler and Component tab in the Inspector. Shows a useful component tree representation.

## Section 8: Practice Project

- If your custom Component has content inside its tag, you can render it out by calling {props.children} in its return Component method.
- Put a "+" in front of a string variable to force it to be compared as an Integer. Look more into this!
- _VERY IMPORTANT!_ When using array.map in JSX, do not use brackets for the callback function block. Instead use parenthesis.

## Section 9: Fragments, Portals, and Refs

- JSX limitation: Can't have adjacent root-level elements. Need to wrap in a div or other element. Can't have more than one root JSX element or store more than one root JSX element in a variable. This is because return ( React.createElement(); React.createElement())) is not valid JS.
- Solving the above by wrapping in a div is fine -- but we may end up with "div soup"! Too many unnecessary divs bloating the html. They don't had semantic meaning or structure to the page.
- One solution is to add our own Wrapper component: We create a component that simply returns props.children, and then use that Component as a wrapper div.
- BUT! We do not need to build this ourselves: React provides this for us with <React.Fragment> tags! Depending on your build set-up, you could even simply do "<> </>"
- React Portals: Lets us write components how we want, but render content somewhere else in the DOM than our JSX indicates. Useful for modals and pop-ups, which shouldn't be nested in other components.
- To utilize React Portals: Import from "react-dom" in the component script, then where you would normally insert your component tag, use ReactDOM.createPortal(<jsx code, passing appropriate props>, document.getElementById(<id of HTML location where this should be rendered at>). And in the HTML, make sure to specify a spot for the portal'd elements!
- Refs (short for reference): Allow us access to other DOM elements. Set up a connection between HTML element and JS code.
- Ref will reference real DOM objects. The ref itself is an object with a current property, which is the DOM reference.
- Only let DOM manipulate the DOM, though! Try to only read DOM data.
- If you only want to READ a value, Refs are probably more ideal than using state. For inputs especially, Refs eliminate the need to track state on every key press, and shortens the code. We reset the input fields back to empty by manipulating the DOM directly, though -- which is something we should avoid as much as possible.
- IMPORTANT: Look at our AddUser component and notice the difference between using useState and useRef when it comes to dealin with the name and age inputs.
- If access Components with ref, we call them "Uncontrolled Components": Their internal state (value reflected in them) is not controlled by React. Typically arises with Form and Input.

## Section 10: Effects, Reducers, and Context

- "Effect" (or "Side Effect"): This refers to anything else that is not React's main, direct job. React's main job is to render UI & react to user input. This other stuff could be storing data in browser storage, sending http requests to backend servers, setting and managing timers, etc.
- These "Side Effect" tasks should not go directly into the normal Component evaluation and render cycle -- especially since they might block/delay rendering (e.g http requests). So we handle them with the useEffect() Hook.
- useEffect(() => { ... }, [ dependencies ]); In this, the first param is a function that should be executed AFTER every component evaluation IF the specified dependencies changed. Your side effect code goes into this function.
- useEffect can be useful when we want data to persist even after page refresh (such as the status of a user being signed in or out). It also avoids infinite loops.
- General rule: Add, as dependencies, whatever you are using in your side effect function. Even the state-setting functions. For example, if using: const [formIsValid, setFormIsValid] = useState(false), and then we have a useEffect(() => { setFormIsValid(enteredEmail, enteredPassword) }, [setFormIsValid, enteredEmail, enteredPassword]); Those 3 things are dependencies! So not just the variables used to access a specific state (enteredPassword, enteredEmail) but also the function for updating that state (setFormIsValid).
- NEVERMIND! You CAN omit state-updating functions, because by default they are ensured by React to never change. They stay the same across all re-render cycles.
- useEffect can run when state or props change -- not just when component is first created.
- Whenever you have an action that should be executed in response to some other action -- that is a Side Effect!
- General rule: Don't need to add state updating functions to dependencies. Don't need to add "built-in" APIs or functions like fetch, localStorage, etc. Don't need to add variables or functions you might have defined OUTSIDE your components (e.g you create a new helper function in a separate file). You must add all things you use in your effect function IF those things could change b/c your component (or some parent) re-rendered. Good rule of thumb is if it's a State or Prop variable.
- Lesson 113 is a good reference for using clean up functionality. Study it more!
- Cleanup function runs before the useEffect function runs (except the first time, on mount. The cleanup function is written inside the first argument of useEffect, and returns a function that is to be executed.
- useReducer() Hook is useful for State Management! Like useState but more useful for complex states. It can be used as a replacement for useState if you need more powerful state management. Doesn't mean you should always use it -- yes it's more powerful, but sometimes the extra work involved is not worth it when useState can suffice. Useful for when state updates depend on other states.
- Using useReducer(): const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn). Note how in our example we created a reducerFn method outside of the scope of the actual Component, because the reducer function won't need any data generated inside of the component function.
- useState(): The main stage management tool. Start with it and move to useReducer if it isn't work. Great for independent pieces of state/data. Great if state updates are easy and limited to a few kinds of updates. useReducer(): Great if you need more power. Can contain more complex state updating logic, where you can move potentially complex logic out of component function body and into separate reducer function. Should be considered if you have related pieces of state/data. Helpful if you have more complex state updates.

### Context API

- React Context API: Component-wide, "behind-the-scenes" Stage Storage. Useful for dealing with large chains of Components that need to pass their props up the component tree through multiple parents (whom don't even care about that prop data -- they are simply there to receive it in order to send it off further into the component tree). Let's us directly pass data to the component that is interested without building such a long prop chain.
- "Context", "State", and "Store" are common folder conventions for where we store Context API files. To define our Context object in a Javascript file, we do:

```js
const ExampleContext = React.createContext( <initial object state> )
```

Since createContext returns a Component in a way, we use the naming convention of capital letters, like with components.

- Using Context is a 2-step process:
  1. First "Provide" the Context.
  2. Then "Listen" to it (or "Consume")! Can "listen" in 2 ways: Use Context.Consumer, or a React hook.
- When using Context.Consumer, we wrap it around the returned JSX in the Component that wishes to consume that data. And then inside the <Context.Consumer> tag we do this: { (context) => { return (the jsx) }. Using this Consumer way has ugly syntax -- so we will do the more elegant of the solutions!
- Using the useContext Hook instead of Consumer: Much simpler! Import {useContext} from React and then add this in your component: const <varName> = useContext(<TheContext>); When this component refers to data that use to be via prop (like prop.isLoggedIn) you would do this instead: varName.isLoggedIn.
- Important: If your child component directly uses the prop you pass down, it does not need to be done via Context API. There are no middle-men, so passing via props is just fine.

## Section 11: Food Order App

## Section 12: Behind the Scenes Look at React and Optimization Techniques

- When exporting a component, you can wrap it in a React.memo() to reduce the number of times it is re-evaluated. It will only run again when one of its props/states actually changes. However, the increased overhead required by React to compare the old / new prop values may not always be worth the reduction in re-evaluations. Best if used carefully and near the top-level of a branch of components.
- Require { useCallback } and use to allow us to store a function across component executions. Allows us to "save" a function and not re-recreate it. This allows the "===" comparison to work when wrapped in React.memo. Pass the function to useCallback as an arrow function: useCallback(() => func(), []) and an array of dependencies. Overall, this allows useMemo to function properly and avoid the "gotcha" caused by not knowing when objects / arrays / functions have not truly changed.
- React makes sure that useState() is only considered once: That is why your Component can be re-evaluated without useState() running again. React recognizes it already has a state and simply updates it -- it doesn't initialize it again.
- Since multiple state changes can be scheduled at the same time, it's recommended to use callback form of state updating (if state relies on previous state). It's safe to not use the callback form in a useEffect -- because useEffect is assured to run every time the state changes -- so you can't miss outstanding state changes. Two (or more) state updates after each other in the same block of code, React batches the state updates together into one state update!
- Require { useMemo } and use to allow us to store data. It's like useCallback, but for things that aren't functions! useMemo( , ) first param is a function for what you want to store via a return, second is dependency.

## Section 13: Class-Based Components

- Setting state in Class-based components only requires us to pass in the key-value pairs for the states we wish to update, and other state key-value pairs are kept intact. In Functional Components, however, the old state is overwritten and not merged!

- setState in Class components always requires and returns an Object.

- Instead of using Side-Effects in Functional Components using useEffect(), we must make use of the Lifecycle methods: componentDidMount(), componentDidUpdate(), componentWillUnmount(), etc.

- 1. componentDidMount() is similar to useEffect(<someMethod>, []) 2) componentDidUpdate is similar to useEffect(<someMethod>, [someValue]) and 3) componentWillUnmount is similar to useEffect() => { return () => {...}}, [])

- Do not call setState in componentDidUpdate unless some condition is met (like a state or prop change) -- it will make the update be called again in infinite loop! Note how the useEffect for Functional Components does not require us to check if the state has even changed (the dependency argument in useEffect does that for us!). We need to check if state has even changed in componentDidUpdate and if not we do not setState again in there. (Could probably avoid this conditional check if we do this in componentShouldUpdate?)

- componentWillUnmount will get called even when we just temporarily hide that component's tag from the DOM.

- useContext is a bit more difficult and less flexible to use in class components. In render method, import the context you want to use, and add <YourContext.Consumer> tags. This works in functional and class components. 2) Add static properties: "static contextType = <YourContext>". Can only do this once per component! So you cannot use multiple Contexts in one class component! And then access: this.context.yourVariableName

- Must use Class-based Components when dealing with "Error Boundaries". Hard to deal with errors in children in React otherwise. The functionality it provides is not currently possible with Functional Components!

- Error Boundary components must implement componentDidCatch() -- it is triggered when any children raises an error. It traditionally renders this.prop.children. You then wrap this Error Boundary component around any components which might throw errors that we wish to handle.

- We could keep state for "hasError" and set it true when appropriate. And then render an error page and message when an error is thrown.

## Section 14: Sending HTTP Requests (E.g. Connecting to a Database)

- Began Studying On: 8/12/21

### Module Introduction

- This section will cover
  - How Do React Apps Interact With Databases?
  - Sending HTTP Requests & Using Responses
  - Handling Errors & Loading State

### How To (Not) Connect To A Database

- Browser-Side Apps Don't Directly Talk To Databases!
  - Database credientials would be exposed in the browser!
  - Performance issues
- Instead, have a backend app (NodeJS App, PHP App, etc).
  - This backend app will communicate with the database -- securely!
  - Differnt server, users of website can never see this server's code
  - Exposs different URLs requests can be sent to

### Our Starting App & Backend

- API - Application Programming Interface
  - Clearly defined interface and rules on how to do certain tasks / achieve certain results
  - Typically talk about REST and GraphQL APIs in the context of web development

### Sending A GET Request

- Can use any typical JS solution for sending HTTP requests with React
- Axios - Makes sending HTTP requests and dealing with responses very simple
- Fetch API - Built-in mechanisms for fetcing and sending data
- Fetch use example:

  ```js
  function fetchMoviesHandler() {
    // Fetch returns a Promise that will return a response
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        // Returns a Promise
        return response.json();
      })
      .then((data) => {
        // Transform the APIs data to match our Movie.js structure
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }
  ```

### Using async / await

- Refactored fetch request, using async/await instead of Promises

```js
function fetchMoviesHandler() {
  // Fetch returns a Promise that will return a response
  fetch('https://swapi.dev/api/films/')
    .then((response) => {
      // Returns a Promise
      return response.json();
    })
    .then((data) => {
      // Transform the APIs data to match our Movie.js structure
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
    });
}
```

### Handling Loading & Data States

- (Simply added some default states and loading states in this lecture)

### Handling HTTP Errors

- Errors can arise when working with requests (404 codes, etc)
- If working with Promises and "then" statements, we'd use "catch" statements to catch our errors
  - But since we are working with async/await, we can use try-catch blocks instead
- Fetch API doesn't treat error status codes as real errors
  - Axios, does generate real errors for error status codes, though!
  - In the Fetch API, the response object has an "ok" field we could check to see if the response was sucessful or not
    - The response also has a "status" field which holds the **concrete response status code**. We could also manually check that

### Using useEffect() For Requests

- **TODO: REWATCH LESSON 179 -- VERY IMPORTANT USEEFFECT AND USECALLBACK INFO I DIDN'T GRASPH**
- Most applications want to start Fetching when a certain Component loads -- not when the user presses a "Fetch" button!
  - For this, use the useEffect hook to handle such a side-effect

### Preparing The Project For The Next Steps

- Firebase - A service by Google. A Backend that comes with a database and full REST API that we can use to send requests
  - Without writing any server-side code ourselves, we can utilize a dummy backend to get and store data
  - Like with our Starwars API fetch example, we will Fetch from Firebase
    - _NOTE:_ Although it looks like we are communicating with Firebase's database, we are interacting with an API -- which behind-the-scenes works with the database

### Sending A POST Request

- **TODO: REWATCH LESSON 181 -- VERY IMPORTANT SENDING POST REQUEST FROM FIREBASE**

### Wrap Up

- React can talk to a backend, but not a database directly
- Can send GET & POST requests to backend APIs, very often REST APIs, using axios or fetch

## Section 15: Building Custom React Hooks

- Began Studying On: 8/12/21?

### What Are "Custom Hooks"?

- Just regular functions that contain stateful logic
- Outsource **stateful** logic into **re-usable functions**
- Unlike "regular functions", custom hooks can use other React hooks and React state
- Mechanism of re-using logic (like regular functions) but can use React hooks and other hooks in them

### Creating A Custom React Hook Function

- Problem - We have two Components that are similiar. We could re-use code to greatly reduce the need for repeated code. However, these Components use Hooks, which cannot be used in just any random function -- must be used in React Compnent function or Custom Hooks
- Solution: We build a custom Hook!
- Custom Hooks must have their function name start with "use"

### Using Custom Hooks

### Configuring Custom Hooks

### Onwards To A More Realistic Example

### Adjusting the Custom Hook Logic

- **TODO: SIGH! VERY CONFUSED**

### Using the Custom Hook In More Components

# Section 16: Working With Forms and User Input

## Module Introduction

This section won't teach any brand-new topics. Rather, we will work on a project that will strenghten our ability to handle forms & user input. We will be working with forms, values, validation, and state

This section will cover:

- What's Complex About Forms?
- Handling Inputs & Forms With React
- Simplifications

## What's So Complex About Forms?

- Forms and their inputs can assume a broad variety of different states
  - One or more inputs could be valid or invalid - All inputs could be valid
  - State could be unknown -- async validation to a server behind the scenes
  - Output input-specific error messages & highlight problem inputs
- Ensure form can't be submitted / saved - Allow form to be submitted / saved
- When To Validate?
  - When form is submitted?
    - Allows the user to enter a valid value before warning him
    - Avoids unnecessary warnings but maybe present feedback "too late"
  - When an input is losing focus?
    - Allows the user to enter a valid value before warning him
    - Very useful for untouched forms
    - Have to wait until input is done before giving feedback
  - On every keystroke?
    - Warns user before he has a chance of entering valid values
    - If applied only on invalid inputs, has the potential of providing more direct feedback

## Dealing With Form Submission & Getting User Input Values

- useRef or useState - which is better for form inputs? Depends on what you want to do with entered values
  - If you only need the entered value once (when form is submitted), a ref might be better
  - If you need value after every keystroke, using state is better
  - State better if you need to reset the entered input. `E.g setEnteredName("");`
    - Doing so with ref isn't ideal -- we are directly manipulating the DOM. E.g `nameInputRef.current.value = ""`

## Adding Basic Validation

- Client-side validation is not reliable; it's there to provide a good user experience

## Providing Validation Feedback

## Handling The "Was Touched" State

## React To Lost Focus

## Refactoring & Deriving States

## Managing The Overall Form Validity

## Assignment 5: Time to Practice: Forms

## Adding A Custom Input Hook

- Could refactor our input logic and have each Input be its own Component, but then managing the overall Form validity would be difficult
  -Another approach: Custom Hook!

## Re-Using The Custom Hook

## A Challenge For You!

## Applying Our Hook & Knowledge To A New Form

## Summary

-- Formik: Popular third-party library for building forms in React

## Bonus: Using useReducer()

# Section 17: Practice Project: Adding HTTP and Forms To The Food Order App

## Module Introduction

- Going to add the following to Food App in this section:
  - Adding a Checkout / Order Form
  - Submitting Orders to a Backend Server (HTTP)
  - Fetching Meals Data

## Reading Form Values

In this section, we used the `useRef` Hook to create input references on our Checkout.js form for the user's Name, Street, Postal Code, and City inputs. We declare each at the top of our Checkout Component, set it equal to "useRef()", add `ref = nameInputRef` (etc for the other inputs) in the input elements, and finally store their value in our Button-press event handler by setting a variable equal to `nameInputRef.current.value`. Here is that process:

```
import { useRef } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
```

## Adding Form Validation

Nothing new here, just more form validation.

We define helper functions to help determine the validity of our fields:

```
const isEmpty = (value) => value.trim() === '';
const is5Chars = (value) => value.trim().length === 5;
```

We create State to keep track of all 4 form input fields (in one object State, rather than 4 separate states):

```
const [formInputsValidity, setFormInputsValidity] = useState({
  name: true,
  street: true,
  city: true,
  postalCode: true,
});
```

We create variables to test the validity of each field after ran through our helper functions:

```
// In function that's called when "Confirm" Button is pressed
const enteredName = nameInputRef.current.value;
const enteredStreet = streetInputRef.current.value;
const enteredPostalCode = postalCodeInputRef.current.value;
const enteredCity = cityInputRef.current.value;

// Validation
const enteredNameIsValid = !isEmpty(enteredName);
const enteredStreetIsValid = !isEmpty(enteredStreet);
const enteredPostalCodeIsValid = is5Chars(enteredPostalCode);
const enteredCityIsValid = !isEmpty(enteredCity);
```

We store these results in our State:

```
// Set state
setFormInputsValidity({
  name: enteredNameIsValid,
  street: enteredStreetIsValid,
  city: enteredCityIsValid,
  postalCode: enteredPostalCodeIsValid,
});
```

We test the validity of the overall form:

```
// Overall form validity
const formIsValid =
  enteredNameIsValid &&
  enteredStreetIsValid &&
  enteredCityIsValid &&
  enteredPostalCodeIsValid;

if (!formIsValid) {
  return;
}

// Form valid: Submit Cart data!
```

And we create helper strings outside our returned JSX code to determine what classes each input gets based on their validity:

```
const nameControlClasses = `${classes.control} ${
  formInputsValidity.name ? '' : classes.invalid
}`;

// Etc for 3 other inputs
```

Finally, in the returned JSX we assign those classes and display an error message if the input is not valid:

```
<div className={nameControlClasses}>
  <label htmlFor='name'>Your Name</label>
  <input type='text' id='name' ref={nameInputRef} />
  {!formInputsValidity.name && <p>Please enter a valid name</p>}
</div>
```

### Submitting & Sending Cart Data

**Always** validate incoming data on the server as well! The checkout information the user provides could be manipulated -- never trust client-side data. In our case, we'd also want to verify the prices of the products in their cart have not be manipulated, by comparing them to the prices in our database.

We want our Checkout data to be sent to the server through our Cart component. In Cart.js, we add:

```
const submitOrderHandler = (userData) => {

};
```

And in our JSX where we show our Checkout component, we pass it as an `onConfirm` prop:

```
{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
```

And in our Checkout Component, at the buttom of the confirmHandler function after all our input validation, we call that handler, passing it in our
checkout data (so now Cart has our user's name, street, city, and postal):

```
// Form valid: Submit Cart data!
props.onConfirm({
  name: enteredName,
  street: enteredStreet,
  city: enteredCity,
  postalCode: enteredPostalCode,
});
```

We can now revisit our submitOrderHandler in our Cart.js and utilize the passed in data from Checkout's onConfirm method:

```
const submitOrderHandler = (userData) => {
  // Send our user checkout data and cart item data to the backend
  // If orders.json doesn't exist, it will be created for us
  fetch('https://react-http-b5854-default-rtdb.firebaseio.com/orders.json', {
    method: 'POST',
    body: JSON.stringify({
      user: userData,
      orderedItems: cartCtx.items,
    }),
  });
};
```

Just like that, our User data and Cart items are now entries in our Firebase "database"!

Next, we need to clear the Cart data and user data inputs when the user clicks "Confirm" and show a loading spinner followed by a success message if the Cart was submitted.

## Adding Better User Feedback

In this lecture, we set up a few new states (for when the order is being Submitted, and when that Submission is finished) in order to provide some interum modal messages about the status of the order. We show "Sending order data..." when the order is being submitted, but has not submitted yet, and "Successfully sent the order!" when the order has finished being submit. When neither of those states are occuring, we display the Checkout page as normal.

We also set up a means to clear the Cart in our CartProvider.js file. We add the following to the CartProvider Component:

```
const clearCartHandler = () => {
  dispatchCartAction({ type: 'CLEAR' });
};
```

In the cart-context.js file, we add a clearCart method to our CartContext:

```
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
```

And back in CartProvider.js, we point our clearCartHandler method to be tied to the cartContext's clearCart method:

```
const cartContext = {
  items: cartState.items,
  totalAmount: cartState.totalAmount,
  addItem: addItemToCartHandler,
  removeItem: removeItemFromCartHandler,
  clearCart: clearCartHandler,
};
```

And finally, back in our Cart.js, upon Checkout form submission, after all validation and setting our submission states, we call the cartContext object's clearCart method!:

```
  setIsSubmitting(false);
  setDidSubmit(true);

  // Clear the Cart
  cartCtx.clearCart();
```

## Summary

And that's it for this section! We're now leveraging a backend for fetching our meals and sending our orders. We added a form with validation during Checkout.

# Section 18: Redux (An Alternative to the Context API)

## Module Introduction

- Understanding Redux
  - Managing App-Wide State with Redux
- What is Redux? Why use it?
- Redux Basics & Using Redux with React
- Redux Toolkit

## Another Look At State in React Apps

What is "Redux"?

- A state management system for cross-component or app-wide state

What is Cross-Component / App-Wide State?

- We can split state into three types:

  - Local State:
    - State that belongs to a single component
    - E.g listening to user input in an input field; toggling a "show more" details field
    - Typically managed with useState / useReducer
  - Cross-Component:
    - State that affects multiple components
    - E.g open / closed state of a modal overlay
    - Requires "prop chains" / "prop drilling", managed with useState / useReducer
    - Cumbersome, can use React Context to make more elegant
  - App-Wide State
    - State that affects the entire app (most / all components)
    - E.g user authentication status, light/dark theme
    - Can manage with useState / useReducer, and "prop chains" / "prop drilling"
    - Cumbersome, can use React Context to make more elegant

## Redux vs React Context

Why Redux if we already have React Context?

- Both Redux and React Context to help us manage cross-component and app-wide states: It gets messy and tedious passing up and down props/states! Redux makes state management simpler.
- Can use both Context and Redux in single application (mix-and-match).
- React Context can have potential disadvantages...
  - 1. Can have a complex setup -- managing this becomes difficult. Could end up with a lot of deeply-nested Context Providers. Or if you try to shove everything into one Context Provider, you end up with a large file that is responsible for far too much!
  - 2. Performance - Context is really only optimized for low frequency unlikely updates (like locale/theme)

## How Redux Works

Core Redux Concepts

- **One** Central Data (State) Store for entire application
- Components set up **Subscriptions** to the central store
  - Whenever data changes, the store notifies the components, who can then get the data they need (a slice) and use it accordingly

How do we change data in the store?

- Components **never** directly manipulate the store data!
- Use a concept called **Reducers**
  - **Reducer function** is responsible for mutating (changing) the store data
    - Note this function is _not_ React's useReducer() Hook. Reducer function is a general concept
- How do we connect components and that reducer function???
  - We _trigger_ some data change with **Actions**
  - Components _dispatch_ / _trigger_ actions, which describe what should be done
- Actions are simple JS objects which describes the operation the reducer should perform
  - Actions are forwarded to the reducer, reads that description of the desired operation, and that operation is performed by the reducer. Reducer spits out a new state to replace the existing state
- Subscribing components are notified after this state change!

## Exploring the Core Redux Concepts

The Reducer Function

- Standard JS function
- Called by redux library
- Two params: Old State + Dispatched Action
- Must return a new state object
- Should be a pure function (same inputs always produce same outputs, no side effects - no HTTP requests, fetch / write to local storage)

```js
const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return {
        counter: state.counter + 1,
      };

    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

// Will run every time its alerted of a state change
const counterSubscriber = () => {
  const latestState = store.getState();
};

store.subscribe(counterSubscriber);

setInterval(() => {
  // counterSubscriber will run every 2 seconds
  store.dispatch({ type: 'increment' });
}, 2000);
```

## Preparing a new Project

- Redux can be used in _any_ JavaScript project -- not just React!
- Doesn't know anything about React -- or care!
- To make working with Redux in React applications easier, we use a second package: **react-redux**
  - Makes connecting React apps to Redux stores and reducers versy simple. Easy to subscribe components to Redux store
  - Can install using `npm install react-redux`

## Creating a Redux Store for React

- Convention to store Redux related code in a src/store/ folder
- We basically do every step as previous, except we do not call dispatch or subscribe -- we will have the Components handle that later

## Providing the Store

- Typically done in the index.js file

```js
// Index.js
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

- Now the store is provided to App and any other child components
- They can tap into it, subscribe to it, dispatch actions, get data out of the store, etc

## How to Work with Redux State Correctly

- **Never** mutate the current state in a reducer!
- It may look like it works properly, but it can have unwanted side-effects
- Always return a brand new object where you copy any nested objects / arrays and create brand new values

## Redux Challenges & Introducing Redux Toolkit

- Potential to typo our action types
  - Could create constants, or enum-type data structures in plain JavaScript to remedy this
- The more data we manage, the bigger the state objects get. Means more copying of state when we update just a single piece of state
  - Could split reducer into multiple smaller reducers
  - Could use third party packages that allow you to automatically copy state and ensure you don't accidentally edit it
- Respecting state immutability can be challenging

To remedy all these potential issues, we can use the **Redux Toolkit** library.

- Developed by the same team as React Redux and Redux
- Extra package which makes working with Redux easier

## Adding State Slices

Installing **Redux Toolkit**

Using Create React App

- `npx create-react-app my-app --template redux` for Redux + Plain JS template
- `npx create-react-app my-app --template redux-typescript` for Redux + TypeScript template

In an Existing App

- `npm install @reduxjs/toolkit`
- `yard add @reduxjs/toolkit`

Can then uninstall Redux, as the Redux Toolkit includes it!

# Section 19: Advanced Redux

### `Originally Started: 11/28/2021`

## Module Introduction

We'll cover more advanced Redux topics in this section, such as:

- Handling Async Tasks with Redux
- Where to Put Our Code
- The Redux DevTools

## Redux & Side Effects (and Asynchronous Code)

Important rule

- Reducer functions must be _pure_, _side-effect free_ and synchronous
  - Applies to Redux reducers and React's useReducer hook
- Input (old state + action) => Output (new state)

When we dispatch an action that requires a side-effect / async task, where should we put that code then? If it can't go in the reducer function...

- Directly inside the component (e.g useEffect(), only dispatch an action when that side-effect is done)
- Inside our own **action creators**
  - Redux has a solution that allows us to perform side-effects / async tasks as part of these action creators, without changing the reducer function

## Frontend Code vs Backend Code

Frontend code depends on backend code
Two possible approaches

- 1. Backend API does a lot of work (i.e transform data + stores data). Frontend react App sends data & receives + use response (i.e less code on the frontend, ahead of the reducer)
- 2. Backend API does very little work (i.e just stores incoming data). Frontend React App transforms data and sends data (i.e more code on the frontend, ahead of the reducer)

Approach 2 is what we're doing so far -- in our cart reducers we aren't just getting the finished cart as the payload, we are getting parts and figuring out how to add it to the cart. Makes complete sense, since we have no backend yet. But now we need a way to still do this work in the reducer, and then send that transformed data to the backend, without doing that sending inside the reducer (since it has to be pure).

## Where to Put Our Logic

Fat Reducers vs Fat Components vs Fat Actions

Where should our logic (Code) go?

Differentiate between two types of code:

- Synchronous, side-effect free code (i.e. data transformations)
  - Typically, prefer Reducers. Avoid Action Creators or Components for this type of code.
- Async code or code with side-effects
  - Prefer Action Creators or Components
  - **Never** use Reducers

So if we extract the data-transformation code (for our Cart logic) out from the Redux store reducer file its currently in, and make it part of a React component itself, we are taking a suboptimical approach!

Then how should we handle this? We need to prepare our cart data before we send it to Firebase, since we can't from inside the Reducer...

## Using useEffect with Redux

Nothing new here; use `useEffect()` to run some fetch request to our Firebase API any time the `cart` state has changed (retrieve using `useSelector()`). So every time we dispatch an event that alters the `cart` state, the `useEffect` will run, make a call to the Firebase API, and send it an object representation of the current Cart, which will be replaced in the database via a "PUT" request.

## Using an Action Creator Thunk

The second approach to having side-effects or async code in conjunction with Redux is to create our own Action Creator.

What Is a "Thunk"?

- A function that delays an action until later
- An action creator function that does _not_ return the action itself, but another function which eventually returns this action

(This section was **confusing AF** -- might want to re-watch it or invest time watching outside resources. Honestly doesn't seem like a worthwhile pattern when implementing the same approach in the Component itself was so easy)

## Getting Started with Fetching Data

## Finalizing the Fetching Logic

## Exploring the Redux DevTools

- These are extra tools which make debugging Redux and its state easier
- Install as a Chrome, Firefox, Edge, etc add-on
- Can view when actions occur, the state they change, a timeline of all actions, etc

## Summary

- Practiced more Redux
- Learned about Redux with side-effects or async code
- Can put this async / side-effect code different places, and how to do each
  - We prefer this code in Action Creators or Components, **never reducers**
  - Putting in Component was rather lean and simple
  - Putting it in custom action creators is a bit more complex, perhaps more elegant
- Learned Redux DevTools
  - Understand our Redux store and state better

`Finished Section: 11/28/2021`

# Section 20: Building a Multi-Page SPA w/ React Router

# Section 21: Deploying React Apps

## Module Introduction:

- This section will cover:
  - Going from development to production
  - Move React app from local machine to real server
  - Deployment Steps & Pitfalls
  - Server-side Routing vs Client-side Routing

## Deployment Steps

- Test code before you deploy
- Explore optimization opportunities for your code
  - Look into lazy loading
- Build App for Production
  - Execute a script (provided by React) that will output a production-ready bundle of our code
    - Minified, optimized code package
- Upload Production Code to Server
- Configure Server / Hosting Provider's Offering

## Adding Lazy Loading

- Lazy loading means that we load code only when that code is needed
  - Split our code into multiple bundles, each only downloaded when they are needed
  - Easy to implement if you are using routing
    - Code for a route is only needed when that route is visited
- How to use:

```js
import React from 'react';
import AllQuotes from './pages/AllQuotes';
// import NewQuote from "./pages/NewQuote";
// Instead of the above import, do:
const NewQuote = React.lazy(() => import('./pagesNewQuote'));
```

- But need to define a fallback UI for when the Component's code is being downloaded
- Solution: Suspense Component! Wrap it around the code where we use the desired Component

```js
function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <NewQuote />
      </Suspense>
    </div>
  );
}
```

### Building The Code for Production

- To build for production, run the following in the command line:

```js
npm run build
```

- A "build" folder will appear, storing the code you need to store on your server
- Never change the code within the "build" folder! To so within your src folder
- "static" folder in the "build" folder stores optimized CSS and JS code

### Getting Started With Deployment (Uploading Files)

- Important: A React SPA is a "Static Website"
  - Only HTML, CSS & browser-side JavaScript
  - The "build" folder contains no code at all that needs to be executed on a server
    - (Of course, we can build our own backend instead of Firebase, but just a React app is a Static Website)
  - So we need a Static Site Host!
    - Again, we will go with Firebase for our hosting, as we did when using it for our dummy API
- Firebase:
  - Have a Firebase account
  - Run` npm install -g firebase-tools`
  - Run `firebase login` command
  - Intiate your project with the following command (in your project folder)
    - `firebase init`
  - Select "Hosting: Configure and deploy Firebase Hosting sites"
  - Select create new or use existing Firebase project
  - It will ask: What do you want to use as your public directory? Default is public
    - We want our build output! So the "build" folder
  - It will ask if we want to configure app as a single-page app?

### Exploring Routing Issues & Finishing Deployment

- When deploying a Single Page Application, it's important to udnerstand there is a diff between server side and client side routing
- React Router is a browser-side package
- Why does that matter?
- In a SPA, we want to ignore the path (part after domain) on the server, and always return the same response (files) no matter which path the user targetted
- The server needs to ignore that path. By default a server does not do that!
- With Firebase, this is easy: It asks if we want to rewrite all urls to /index.html
- Set up auto builds and deploys with Github? Nah!
- "File build/index.html already exists. Overwrite?" - No!
- Finally, run `firebase deploy` - uploads code, and gives us a URL
- If we ever want to take our site down: `firebase hosting:disable`

# Section 22: Adding Authentication to React Apps

# Section 23: A (Pretty Deep Dive) Introduction to Next.js

## Module Introduction

- This module will teach...
  - What is NextJS? And Why?
  - File-based Routing & Page Pre-rendering
  - Data Fetching & Adding an API

## What is Next.JS?

- The React Framework for Production
- A _fullstack_ Framework for ReactJS
- Frameworks are bigger, more feature-rich than a library (which React is)
- NextJS solves common problems and makes building React apps easier
- Lots of built-in features (e.g. routing) that help you solve common problems, and clear guidance on how to use those features
- You still write React code, you still build React components and use React features (props, state, context, etc).
  - NextJS just enhances your React apps and adds more features!
- There are certain problems which you will need to solve for almost all production-ready React apps: NextJS solves those for you!

## Key Feature 1: Built-in Server-side Rendering (Improved SEO!)

- Server-side rendering: Preparing the content of the page on the server instead of the client
  - Client-side rendering of React apps has actual HTML code that is pretty empty
  - Search engine crawlers will only see the empty HTML page, not the content of your page
  - Client-side can have flickering loading as data is being retrieved before it is displayed
- Server-side can pre-render React pages on a server
- ReactJS has this feature too, but it can be tricky to setup. NextJS has it built-in and makes it simple!
- Blending client-side and server-side: Fetch data on the server and render finished pages

## Key Feature 2: Simplified Routing with File-based Routing

- In traditional React, we don't even have a "router" (illusion of multiple pages - changing what's visible on screen based on URL, w/o sending a request to a server)
  - Need React Router for this
- In NextJS, you define pages and routes with files and folders instead of code
  - This leads to less code, less work, and is highly understandable (close to typical web development)

## Key Feature 3: Build Fullstack Apps

- Easily add backend (server-side) code to your Next / React apps
- Storing data, getting data, authentication, etc, can be added to your React projects

## Creating a New Next.js Project & App

- Need Node.js!
- `npx create-next-app` command to create a NextJS app
- `cd <project-name>` and then `npm run dev` to start your development server after

## Analyzing the Created Project

- create-next-app gives us a project with "pages", "public", and "styles" folders.
- styles: Holds some style files
- public: Holds public resources page might use, like images
  - No index.html like in React app
- pages: Most important folder. Where we set up our file-based routing. The pages that make up our application are here

## Adding First Pages

## Adding Nested Paths & Pages (Nested Routes)

# Section 24: Animating React Apps

`Originally Started: 11/28/2021`

## Module Introduction

This section will cover Animating React Apps & Components

- Adding Smooth Animations to our Apps
- CSS Animations & Why They Are Sometiems Not Enough
- Animating react Components with Extra Libraries

A demo project will be provided for us. It uses Class-based Components instead of Functional (ew!)

## Using ReactTransitionGroup

Much like in Colt Steele's React course, we are going to make use of the third party package: ReactTransitionGroup!

- Smoothly animate elements when they are added to and from the DOM
- Install: `npm install react-transition-group --save`

## Alternative Animation Packages

**React-Motion** is also a popular animation package.

- A little tougher to get started
- More physics-based animations
- Don't define durations: It tries its best to determine realistic timings

**React-Move** is also a popular choice

- Exposes two basic components
- Always work with objects describing the state of an animation
- Heavily influenced by ThreeJS transitions
- Can help build more complex animations
- Can animate groups, like bars on a graph

**React-Router-Transition**

- Easily create transitions between different routes!
- Builds up on React-Motion
- AnimatedSwitch component, which you replace your normal Router Switch with
- Does what normal Switch does, but atEnter, atLeave, atActive, className properties
- Animating Routes can be very tricky with other packages -- not-so-hard with this package!

## Wrap Up

- Animations can help guide user attention and provide a nice user experience
- React-Transition-Group gives JavaScript layer to add in order to orchestrate your CSS animations
- React-Motion if want a more CSS-independent solution. Emulates real-world physics

`Section Completed: 11/29/2021`

