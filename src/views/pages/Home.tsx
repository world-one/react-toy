import React from 'react';
import '#/pages/home.scss';

class Home extends React.Component{

    render(){
        return (
            <div className="contents">
                <div className="wrap">
                    <ul className="project__list">
                        <li className="project__item">날씨</li>
                        <li className="project__item">계산기</li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default Home;