import React from 'react';
import { BrowserRouter,Switch,Route } from "react-router-dom";
import Header from '@/components/Header';
import { 
  Home,
  Weather
} from '@/pages';


const menuList = [
  { name: 'Home', path: '/' },
  { name: 'Weather', path: '/weather' },
]

class Router extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <Header menuList={ menuList } name="j" age={1} />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Weather" component={Weather}/>
            {/* <Route path="/Project/:title" component={Project}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default Router;
