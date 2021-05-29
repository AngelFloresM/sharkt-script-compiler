import React from "react";

export default function Parser({ results }) {
   return (
      <>
         <textarea
            id="parserArea"
            name="parserArea"
            value={JSON.stringify(results, null, " ")}
            readOnly
         />
      </>
   );
}
