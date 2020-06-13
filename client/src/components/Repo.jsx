import React from 'react';

const Repo = (props) =>{
  console.log(props)
  return (
      <li>
        <p>Repo Name: {props.name}</p>
        <p>Creator: {props.user}</p>
        <p>Link: {props.url}</p>
      </li>
  )
}

export default Repo