import React, { useState } from 'react';
import Title from '../../atoms/Title';

function AddNumber() {
  const [count, setCount] = useState(0);
  function plus() {

    //일괄 처리, 비동기로 동작, 의도와 달리 숫자는 1만 올라간다.
    // setCount(count + 1);
    // setCount(count + 1);

    //위의 문제를 해결하는 방법
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }
  function minus() {
    setCount(count-1);
  }

  //상태값이 변경되면 변경사항을 파악하고 변경된 부분은 돔에 업데이트된다.
  console.log('render'); 

  return (
    <div>
      <Title title={`현재 카운트: ${count}`} />
      <button onClick={plus}>증가</button>
      <button onClick={minus}>감소</button>
    </div>
  )
}

export default AddNumber;