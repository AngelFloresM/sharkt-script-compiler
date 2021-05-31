import React from "react";

export default function Semantic({ results }) {
   return (
      <>
         <textarea id="parserArea" name="parserArea" value={results} readOnly />
      </>
   );
}
