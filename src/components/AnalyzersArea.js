import React, { useState } from "react";
import axios from "axios";
import Results from "./Results";

export default function Analyzers({ code, setError }) {
   const [type, setType] = useState("lexico")
   const [results, setResults] = useState(undefined);

   function performAnalysis(event) {
      setType(event.target.name);
      const analysisType = event.target.name;
      axios
         .post(`http://localhost:8080/${analysisType}`, {
            code,
         })
         .then((response) => response.data)
         .then((data) => {
            console.log(data)
            const {result, error, message} = data
            setResults(result)
            setError({error, message})
         });
   }

   return (
      <div className="analyzers">
         <div className="analyzers-area">
            <p>Analizadores:</p>
            <div className="buttons">
               <button name="lexico" onClick={performAnalysis}>
                  Léxico
               </button>
               <button name="sintactico" onClick={performAnalysis}>
                  Sintactico
               </button>
               <button name="semantico" onClick={performAnalysis}>
                  Semantico
               </button>
            </div>
         </div>
         <Results
            results={results}
            type={type}
         />
      </div>
   );
}
