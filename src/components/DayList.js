import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){

  
 
  const dayArray=props.days.map((dayArr)=>{
    return (
    
       <DayListItem 
       key={dayArr.id} 
       name={dayArr.name} 
       spots={dayArr.spots} 
       setDay={()=>props.onChange(dayArr.name)} 
       selected={props.day===dayArr.name}

       /> 
    )
  })
  return(
    <ul>{dayArray}</ul>
  )
  }