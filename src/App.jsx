import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './components/page/home/Home';
import AddNumber from './components/page/add-number/AddNumber';
import Calculator from './components/page/calculator/Calculator';
import Hook from './components/page/hook/Hook';

function App(props) {
  return (
    <BrowserRouter>
      <nav style={{display:"flex", justifyContent: "space-around", paddingTop: "20px"}}>
        <Link to="/">Home</Link>
        <Link to="/addNumber">숫자 증가</Link>
        <Link to="/calculator">계산기</Link>
        <Link to="/hook">react hook</Link>
      </nav>
      <Route exact path="/" component={Home} />
      <Route exact path="/addNumber" component={AddNumber} />
      <Route exact path="/calculator" component={Calculator} />
      <Route exact path="/hook" component={Hook} />
    </BrowserRouter>
  );
};

export default App;