import React, { useState } from "react";
import Results from "./Results";

export default function Analizers({ code }) {
   const [type, setType] = useState("lexico");
   const [performAnalysis, setPerformAnalysis] = useState(false);

   function changeType(event) {
      // setType(event.target.name);
      if (performAnalysis === false) {
         setPerformAnalysis(true);
      }
      setTimeout(() => {
         setPerformAnalysis(false)
      }, 250);
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
         <Results
            code={code}
            type={type}
            performAnalysis={performAnalysis}
            changePerform={setPerformAnalysis}
         />
      </div>
   );
}
