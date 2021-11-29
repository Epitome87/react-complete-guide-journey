import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    // Call the appropriate action function, which returns an updated state
    const updatedState = actions[actionIdentifier](globalState, payload);

    // Updated Global State
    globalState = { ...globalState, ...updatedState };

    // Inform all listeners about this state update:
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) listeners.push(setState);

    // Remove listener when unmount
    return () => {
      if (shouldListen)
        listeners = listeners.filter((listener) => listeners !== setState);
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
    actions = { ...actions, ...userActions };
    console.log('GLOBAL', globalState);
  }
};
