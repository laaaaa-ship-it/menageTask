import { useState } from "react";

export default function Cointer(){
    const [x, setx] = useState(0);
    const minus = () =>{
        setx(x - 1);}
    const plus = () =>{
        setx(x + 1);
    }
    return (
        <>
            <h1>{x}</h1>
            <button onClick={minus}>-</button>
            <button onClick={plus}>+</button>
        </>
    );
}

