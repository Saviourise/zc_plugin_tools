import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Githubgivepermission from "./containers/Githubgivepermission";
// import ToolsHeader from "../../toolsheader/toolsheader";
import GithubHome from "./containers/GithubHome";
import GithubInstalled from "./containers/GithubInstalled";
import Githubauth from "./containers/Githubauth";
import { initialState, reducer } from "./containers/store/reducer";

export const AuthContext = createContext();

const Github = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          dispatch
        }}
      >
        {/* <ToolsHeader /> */}
        <Router>
          <Switch>
            <Route exact path='/github/githubgivepermission' component={Githubgivepermission} />
            <Route exact path='/github' component={GithubHome} />
            <Route exact path='/github/auth' component={Githubauth} />
            <Route
              exact
              path='/github/github-installed'
              component={GithubInstalled}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default Github;
