import React, { useState, useEffect } from "react";
import Token from "./results/Token";
import { lexer } from "../scripts/Lexer";

export default function Results({
   type,
   code,
   performAnalysis,
   changePerform,
}) {
   const [textCode, setTextCode] = useState(code);
   const [tokens, setTokens] = useState([]);

   useEffect(() => {
      if (performAnalysis) {
         setTextCode(code);
      }
   }, [performAnalysis]);

   useEffect(() => {
      performLexer();
   }, [textCode]);

   function performLexer() {
      let token;
      let tokenList = [];
      tokenList.push({ type: "Type", value: "Value" });
      lexer.reset(textCode);
      while ((token = lexer.next())) {
         const { type, value } = token;
         tokenList.push({ type, value });
      }
      setTokens(tokenList);
   }

   return (
      <div className="results">
         <p>Resultados:</p>
         <div className="results-area">
            {tokens.map(({ type, value }, i) => (
               <Token type={type} value={value} key={i} />
            ))}
         </div>
      </div>
   );
}
