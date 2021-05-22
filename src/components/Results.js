import React, { useState, useEffect } from "react";
import Token from './results/Token'

export default function Results({type, code}) {
   const [textCode, setTextCode] = useState("");

   useEffect(() => {
      console.log(type)
   }, [type, code])

   return (
      <div className="results">
         <p>Resultados:</p>
         <div className='results-area'>
            <Token type="Type" value='Value'/>
         </div>
      </div>
   );
}
