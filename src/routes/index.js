import React from 'react';
import { Switch, Route } from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';

import Home from '../pages/home';
import About from '../pages/about';
import Bugs from '../pages/bugs';
import Security from '../pages/security';
import Aur from '../pages/aur';
import Download from '../pages/download';

const RouteContainer = posed.div({
    enter: { opacity: 1, delay: 350, beforeChildren: true, y: 0 },
    exit: { opacity: 0, y: -25 }
});

const Routes = (props) => (
    <Route render={ ({ location }) => (
        <PoseGroup>
            <RouteContainer key={location.key}>
                <Switch location={location}>
                    <Route exact path="/" component={Home} key="home"/>
                    <Route path="/about" component={About} key="about"/>
                    <Route path="/bugs" component={Bugs} key="bugs"/>
                    <Route path="/security" component={Security} key="security"/>
                    <Route path="/aur" component={Aur} key="aur"/>
                    <Route path="/download" component={Download} key="download"/>
                </Switch>
            </RouteContainer>
        </PoseGroup>
    )}/>
)

export default Routes;