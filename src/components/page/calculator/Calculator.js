import React, { useEffect } from 'react';
import Title from '../../atoms/Title';
import DrawKeyPad from './library/DrawKeypad';
import Calc from './library/Calculator';
import '../../../sass/calculator.css';

function Calculator() {
  useEffect(() =>{
    new DrawKeyPad();
    new Calc({targetElId: 'js-keypad', processElId: 'js-process', resultElId: 'js-result'});
    // new Calc( 'js-keypad',  'js-process', 'js-result');
  });

  return <>
    <Title title="계산기" />
    <div className="wrap__calculator">
      <textarea className="input__data input__data__process" id="js-process" placeholder="0" readOnly ></textarea>
      <input className="input__data input__data__result" id="js-result" type="text" placeholder="0" readOnly />
      <div className="wrap__keypad" id="js-keypad">
        <div className="keypad" id="js-keypad-btns"></div>
        <div className="keypad operator" id="js-keypad-operators"></div>
      </div>
    </div>
  </>
}

export default Calculator;