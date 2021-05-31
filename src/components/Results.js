import React, { useState, useEffect } from "react";
import Lexer from "./analyzers/Lexer";
import Parser from "./analyzers/Parser";
import Semantic from "./analyzers/Semantic";

export default function Results({ type, results }) {
   return (
      <div className="results">
         <p>Resultados:</p>
         <div className="results-area">
            {type === "lexico" ? (
               <Lexer results={results} />
            ) : type === "sintactico" ? (
               <Parser results={results} />
            ) : (
               <Semantic results={results} />
            )}
         </div>
      </div>
   );
}
