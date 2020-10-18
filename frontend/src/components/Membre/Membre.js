import React from 'react';
import { Breadcrumb, BreadcrumbItem, Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import AfficherMessage from "../Login/AfficherMessage";
import Profile from "../Login/Profile";
import ListerProjects from "../Login/ListerProjects";
import AjouterProjet from "../Login/AjouterProjet";
import ProjectContainer from '../ProjectContainer/ProjectContainer';
import ProjetDetails from "../Login/ProjetDetails";


export default function Membre({ match }) {
  return(
    <Container>
      <Breadcrumb>
        <BreadcrumbItem>
          Membre
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Switch>
            <Route path={`${match.path}/bienvenue`}>Bienvenue</Route>
            <Route path={`${match.path}/profil`}>Profil</Route>
            <Route path={`${match.path}/mesProjets`}>Mes Projets</Route>
          </Switch>
        </BreadcrumbItem>
        <Route path={`${match.path}/mesProjets`} render={(routeProps) => {
          return (
            <BreadcrumbItem>
              <Switch>
                <Route exact path={`${routeProps.match.path}/nouveau`}>Créer un projet</Route>
                <Route path={`${routeProps.match.path}/:projectId`}>Projet</Route>
              </Switch>
            </BreadcrumbItem>
          );
        }} />
      </Breadcrumb>
          <Switch>
            <Route exact path={`${match.path}/bienvenue`} component={AfficherMessage}/>
            <Route exact path={`${match.path}/profil`} component={Profile}/>
            <Route exact path={`${match.path}/mesProjets/nouveau`} component={AjouterProjet}/>
            <Route exact path={`${match.path}/mesProjets`} component={ListerProjects}/>
            <Route path={`${match.path}/mesProjets/:projectId`} component={ProjectContainer}/>
          </Switch>
    </Container>
 );
}