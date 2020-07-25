// by ES2015
import Stack from './Stack';

import React from 'react';

class Calculator extends React.Component{
  
  TYPE() {
    return { 
      NUMBER: 'number',
      OP: 'operator',
      DOT: 'dot',
      BRACKET: 'bracket',
      CLEAR: 'clear',
      CALCULATION: 'calculation',
    }
  }
  
  constructor(props){   
    super(props);
    this.keypadEl = document.getElementById(props.targetElId); 
    this.processEl = document.getElementById(props.processElId);
    this.resultEl = document.getElementById(props.resultElId);
    this.onClickHandler =  this._onClickEvent();
    this.inputValueArr = [];
    this.inputTypeArr = [];
    this.bracketStack = new Stack();
    this.init();
  }

  init(){
    this.keypadEl.addEventListener('click', (e)=>{
      this.onClick(e.target);
    });
  }

  onClick(btn){
    if(btn.dataset.keypadType !== undefined){
      const btnType = btn.dataset.keypadType;
      const btnValue = btn.dataset.value;
      if(this.checkBracket(btnType)){
        this.onClickHandler[btnType](btnValue, btnType);
      }
    };
  }
  
  _onClickEvent(){
    return{
      number: (btnValue, btnType) => {
        if(this.checkZeroNumber()){
          this.pushValueArr(btnValue, btnType);
        }
      },
      operator: (btnValue, btnType) => {
        const prevType = this.getPrevType();
        if(prevType && prevType !== this.TYPE.OP){
          this.pushValueArr(btnValue, btnType);
        }
      },
      bracket: (btnValue, btnType) => {
        const prevType = this.getPrevType();
        if(prevType === this.TYPE.NUMBER 
            && this.bracketStack.store.length > 0){ //숫자가 앞에 있고, 짝을 이루지 못한 괄호가 있을 경우
            btnValue = ')';
            this.bracketStack.pop();
        }
        if(btnValue === '(') {
          if(prevType === this.TYPE.NUMBER) return;
          this.bracketStack.push(btnValue);
        }
        this.pushValueArr(btnValue, btnType);
      },
      dot: (btnValue, btnType) => {
        if(this.checkDot() !== this.TYPE.DOT) //
          this.pushValueArr(btnValue, btnType);
      },
      clear: (btnValue) => {
        if(btnValue > 0) { //CE
          const value = this.inputValueArr.pop();
          const type = this.inputTypeArr.pop();
          if(type === this.TYPE.BRACKET){
            if(value === '(') this.bracketStack.pop();
            if(value === ')') this.bracketStack.push('(');
          }
        }else{ //AC
          this.inputValueArr = [];
          this.inputTypeArr = [];
          this.bracketStack.reset();
        } 
        this.insertValueProcessEl();
      },
      calculation: () => {
        if(this.getPrevType() === this.OP){ //마지막 입력값이 연산자일때 삭제
          this.inputValueArr.pop();
        }
        if(this.bracketStack.store.length > 0){ //괄호가 덜 닫혔을 경우 자동으로 추가
          this.bracketStack.store.forEach((el)=>{
            this.inputValueArr.push(')');
          });
          this.bracketStack.reset();
        }
        
        this.insertValueProcessEl();
        this.resultEl.value = eval(this.processEl.value);
      },
    }
  }

  pushValueArr(btnValue, btnType){ //입력값 배열에 추가
    this.inputValueArr.push(btnValue);
    this.inputTypeArr.push(btnType);
    this.insertValueProcessEl();
  }

  insertValueProcessEl(){ //입력값 화면에 출력
    this.processEl.value  = this.inputValueArr.join('');
  }

  getPrevType(){ //이전 입력 타입 확인
    const arrLen = this.inputTypeArr.length;
    if(arrLen === 0) return false;
    return this.inputTypeArr[arrLen-1];
  }

  checkZeroNumber(){ //숫자 0이 앞에 올 수 있는 상황 체크
    const arrLen = this.inputValueArr.length;
    let type;
    let active = true;
    for(let i = arrLen-1; i > -1; i--){ //0이 앞자리로 올 경우 입력 제한 ex)08
      type = this.inputTypeArr[i];
      if(type !== this.TYPE.NUMBER ){
        if(type === this.TYPE.DOT) break;
        if(this.inputValueArr[i+1] === 0){
          active = false;
          break;
        }
      }
      if (i === 0 && this.inputValueArr[i] === 1){
        active = false; 
      }
    }
    return active; 
  }

  checkDot(){ //소수점 중복 체크
    let type = '';
    for(let i = this.inputTypeArr.length - 1; i > -1; i--){
      type = this.inputTypeArr[i];
      if(type === this.TYPE.OP || type === this.TYPE.DOT) break;
    }
    return type;
  }

  checkBracket(btnType){ //괄호 앞뒤 타입별 입력 제한
    const prevType = this.getPrevType();
    if(btnType === this.TYPE.CALCULATION || btnType === this.TYPE.CLEAR) return true;
    if(prevType === this.TYPE.BRACKET){
      if (this.inputValueArr[ this.inputValueArr.length - 1 ] === '('){
        if(btnType === this.TYPE.OP) return false;
      }else{ // ')';
        if(btnType !== this.TYPE.OP) return false;
      };
    }
    return true;
  }

};

export default Calculator;



