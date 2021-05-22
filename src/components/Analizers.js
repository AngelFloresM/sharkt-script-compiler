import React, { useState } from "react";
import Results from "./Results";

export default function Analizers({ printCode, code }) {
   const [type, setType] = useState("lexico");

   function changeType(event) {
      setType(event.target.name);
      printCode()
   }

   return (
      <div className="analyzers">
         <div className="analizers-area">
            <p>Analizers:</p>
            <div className="buttons">
               <button name="lexico" onClick={changeType}>
                  Léxico
               </button>
               <button name="sintactico" onClick={changeType}>
                  Sintactico
               </button>
               <button name="semantico" onClick={changeType}>
                  Semantico
               </button>
            </div>
         </div>
         <Results code={code} type={type} />
      </div>
   );
}
