import { useState } from "react";

export default function Text() {
  const [text, setText] = useState('');
  const Clear = () =>{
    setText("")}
  return (
    <div>
      <input onChange={(e)=>{
        setText(e.target.value)
      }} type="text" value={text}/>
      <h1>{text}</h1>
      <button onClick={Clear}>очистить</button>
    </div>
  );
}
