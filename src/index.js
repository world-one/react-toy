import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

// function Container() {
//   return React.createElement(
//     'div',
//     null,
//     React.createElement(Button, { label: '좋아요' }),
//     React.createElement(Button, { label: '싫어요' }),
//   );
// }

// function Container() {
//   const [count, setCount] = useState(0);
//   function onClick() {
//     setCount(count+1);
//   }
//   return (
//     <div>
//       <Title title={`현재 카운트: ${count}`} />
//       <button onClick={onClick}>증가</button>
//     </div>
//   )
// }

ReactDom.render(<App />, document.getElementById('root'));