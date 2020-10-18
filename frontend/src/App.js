import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Header from './components/Header/Header';
import AjouterProjet from "./components/Login/AjouterProjet";
import Profile from "./components/Login/Profile";
import Login from "./components/Login/Login";
import AfficherMessage from "./components/Login/AfficherMessage";
import ListerProjects from "./components/Login/ListerProjects";
import FormulaireSignUpMembre from "./components/SignUp/FormulaireSignUpMembre";
import FormulaireSignUpBenevole from "./components/SignUp/FormulaireSignUpBenevole";
import FormulairePayment from "./components/SignUp/FomulairePayment";
import ChoixMembership from "./components/SignUp/ChoixMembership";
import ProjetDetails from "./components/Login/ProjetDetails";



import Footer from './components/Footer/Footer';
import ProjectContainer from './components/ProjectContainer/ProjectContainer';
import Membre from './components/Membre/Membre';

function App() {
const [loggin, setLoggedin] =useState(false);
const [projetID, setProjetID] = useState('');
const [loggedInMemberID, setLoggedInMemberID]=useState('');

  return (
    <div className="App">
      <div className="App-main">
        <Router>
        <Header loggin={loggin} />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/projects" component={Projects} />
            <Route path="/login" component={()=><Login setLoggedInMemberID={setLoggedInMemberID} setLoggedin={setLoggedin}/>}/>
            <Route path="/inscription-benevole" component={FormulaireSignUpBenevole}/>
            <Route path="/inscription-membre" component={FormulaireSignUpMembre}/>
            <Route path="/inscription-payment" component={FormulairePayment}/>
            <Route path="/inscription" component={ChoixMembership}/>
          
            <Route path="/membre" component={Membre}/>
            <Route path="/welcome" component={()=><AfficherMessage loggedInMemberID={loggedInMemberID} setLoggedInMemberID={setLoggedInMemberID}/>}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/addProject" component={()=><AjouterProjet loggedInMemberID={loggedInMemberID}/>}/>
            <Route path="/listMemberProject" component={ListerProjects}/>
            <Route path="/myProjects/:projectId" component={ProjectContainer}/>
          
          
          </Switch>
        </Router>
        
      </div>

      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
