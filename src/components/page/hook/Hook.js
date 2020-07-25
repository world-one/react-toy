import React, { useEffect, useState } from 'react';

function Hook() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);

    //반화되는 함수는 useEffect가 호출되기 직전에 호출되고, 컴포넌트가 사라지기 직전에 마지막으로 호출된다.
    return () => {
      window.removeEventListener('resize', onResize);
    };
  //의존성 배열을 빈 배열로 넣게 되면 컴포넌트가 생성될 때만 useEffectrk 호출되고, 컴포넌트가 사라질 때만 반환된 함수가 호출된다. 
  },[]);
  console.log('render');
  return<>
    <div>{`width is ${width}`}</div>
  </>
}

export default Hook;