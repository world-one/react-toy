import React from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Header from '@/components/Header';
import { Container, Segment } from 'semantic-ui-react'
import { 
  Home,
  Weather,
  Markdown
} from '@/pages';
class Router extends React.Component{
  
  menuList(){
    return [
      { name: 'Home', path: '/', desc: '메인페이지' },
      { name: 'Weather', path: '/weather', desc: 'openweathermap API' },
      { name: 'Markdown', path: '/markdown', desc: 'read md file render' },
    ]
  }
  
  render(){
    return (
      <HashRouter>
        <Container>
          <Header menuList={ this.menuList() } />
          <Segment>
          <Switch>
            <Route exact path="/"  render={ (props) => <Home {...props} menuList={this.menuList()} /> } />
            <Route exact path="/Weather" component={Weather}/>
            <Route path="/Markdown" component={Markdown}/>
          </Switch>
          </Segment>
        </Container>
      </HashRouter>
    );
  }
}


export default Router;
