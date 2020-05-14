import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
interface menu{
    name: string,
		path: string,
		desc?: string 
}
interface menuList{
    menuList: menu[]
}

const Header = ({menuList}:menuList) => {
	
	const path = window.location.hash.replace('#','');
	const [ active, setActive ] = useState(path);

	return (    
		<header className="header">
			<Menu pointing secondary>
				{menuList.map((item:menu, index:number)=>{
					return (
						<Menu.Item 
							name= {item.name}
							active= {active === item.path} key={index} as={Link} to={item.path}
							onClick= {()=>setActive(item.path)}
						/>
					);
				})}    
			</Menu>
		</header>
	);
}

export default Header;