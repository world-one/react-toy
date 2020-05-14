import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from "react-router-dom";

interface menu{
  name: string, 
  path: string,
  desc?: string
}
interface menuList{
  menuList: menu[]
}
class Home extends React.Component<menuList>{
  public menuList:menu[];
  constructor(props:menuList){
    super(props);
    this.menuList = props.menuList;
  }
  
  render(){          
    return (
      <Card.Group >
      {this.menuList.map( (el, index) => 
        <Card as={Link} to={el.path}
          key={index}
          header={ el.name }
          description= {el.desc ? el.desc : ''}
          meta= {el.path}
        />)}
      </Card.Group>
    );
  }

}

export default Home;