import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Header from './components/Header/Header';
import FormulaireSignUpMembre from "./components/SignUp/FormulaireSignUpMembre";
import FormulaireSignUpBenevole from "./components/SignUp/FormulaireSignUpBenevole";
import FormulairePayment from "./components/SignUp/FomulairePayment";
import ChoixMembership from "./components/SignUp/ChoixMembership";

import Footer from './components/Footer/Footer';
import Membre from './components/Membre/Membre';
import { AuthContextProvider } from './components/context/AuthContext/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <div className="App-main">
          <Router>
            <Header />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/projects" component={Projects} />
              <Route path="/inscription-benevole" component={FormulaireSignUpBenevole} />
              <Route path="/inscription-membre" component={FormulaireSignUpMembre} />
              <Route path="/inscription-payment" component={FormulairePayment} />
              <Route path="/inscription" component={ChoixMembership} />
              
              <Route path="/membre" component={Membre} />
            </Switch>
          </Router>
        </div>

        <footer className="App-footer">
          <Footer />
        </footer>
      </div>
    </AuthContextProvider>
  );
}

export default App;
