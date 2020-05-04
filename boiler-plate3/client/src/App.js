import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NavBar from './components/views/NavBar/NavBar';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Footer from './components/views/Footer/Footer';
import SearchPage from './components/views/SearchPage/SearchPage';
import SearchedPage from './components/views/SearchPage/SearchedPage';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <hr />

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/search" component={SearchPage}/>
          <Route exact path="/searched" component={SearchedPage}/>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
