import React from "react";
import Results from "./Results";

export default function Analizers({ printCode }) {
   return (
      <div className="analyzers">
         <div className="analizers-area">
            <p>Analizers:</p>
            <div className="buttons">
               <button onClick={printCode}>Léxico</button>
               <button>Sintactico</button>
               <button>Semantico</button>
            </div>
         </div>
         <Results />
      </div>
   );
}
