import React from 'react';
import UserContext from './components/context/user-context';
import { authenticationService } from './components/services';
import ContainerElement from './container';
function App() {
  const [userContext, setUserContext] = React.useState(authenticationService)
  function updateContextValue(contextValue) {
    setUserContext(contextValue)
  }
  return (
    <UserContext.Provider value={{userContext, updateContextValue}}>
      <ContainerElement />
    </UserContext.Provider>

  );
}

export default App;
