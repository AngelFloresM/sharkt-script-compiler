import React, { useState } from "react";

export default function Results() {
   const [textArea, setTextArea] = useState("");

   function changeTextArea(event) {
      setTextArea(event.target.value);
   }

   return (
      <div className="results">
         <p>Resultados:</p>
         <textarea
            name="results"
            value={textArea}
            onChange={changeTextArea}
         />
      </div>
   );
}
