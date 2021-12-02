import { useState } from "react";


export default function useVisualMode(initial){

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition=(newMode, replace = false)=>{
  
    replace ? history[history.length-1] = newMode : setHistory(prev => ([...prev, mode]))
    setMode(newMode)

  }

  const back=()=>{
    if(history.length > 1){
      history.pop();
      setMode(history[history.length-1]);
    }
    
  }

  return{
    mode,
    onChange: (event)=>setMode(event.target.value),
    transition,
    back,
    
  }

}
