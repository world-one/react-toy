import React from 'react';
import { Link } from "react-router-dom";

interface menu{
    name: string,
    path: string
}
interface info{
    name : string,
    age :number
}
const Header = ({menuList}:any, {name, age}:info) =>{
    return (
        <header className="header">
            <div className="wrap">
                <nav className="header__nav">
                    <ul className="nav__menu__list">
                        {menuList.map((item:menu, index:number)=>{
                            return (
                            <li key={index}>
                                <Link className="nav__menu__anchor" to={item.path}>{item.name}</Link>
                            </li>
                            );
                        })}
                        
                    </ul>
                </nav>
            </div>
        </header>
    );

}

export default Header;