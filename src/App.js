import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Profile from './user/profile';

class App extends React.Component{
  

  render()
  {
    return(
        <BrowserRouter>
        
            
              <Switch>
                <Route exact path="/signup" component={SignUp}></Route>
                <Route exact path="/signin" component={SignIn}></Route>
                <Route exact path="/profile" component={Profile}></Route>

              </Switch>
          
        </BrowserRouter>
    )
  } 
}
export default App;