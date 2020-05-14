import React,{ useState } from 'react';
import ReactMarkdown from 'react-markdown';


const Markdown = () => {
  const [ source, setSource ] = useState('# md file read');  
  
  const readFile = require("../../md/markdown.md");
  fetch(readFile)
    .then(res => {
      return res.text();
    }).then( text=>{
      setSource(text);
    } );
  
  return <ReactMarkdown source={source} />
}



export default Markdown