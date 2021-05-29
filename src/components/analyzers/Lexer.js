import React from "react";
import Token from "./Token";

export default function Lexer({ results }) {
   return (
      <>
         {results
            ? results.map(({ type, value }, i) => (
                 <Token type={type} value={value} key={i} />
              ))
            : null}
      </>
   );
}
