import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


const formatSpots=(spots)=>{
  if(spots===0){
    return (`no spots remaining`)
  } else if(spots===1){
    return (`1 spot remaining`)
  }
  return (`${spots} spots remaining`)
}



export default function DayListItem(props) {
  const dayClass=classNames("day-list__item",
    {"day-list__item--selected" : props.selected},
    {"day-list__item--full" : !props.spots})
  console.log(props)
  const availability=formatSpots(props.spots)
  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light"  >{availability}</h3>

    </li>
  );
}
