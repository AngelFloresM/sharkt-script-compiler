import React from "react";

export default function Errors({ errors }) {
   const {error, message} = errors
   return (
      <div className="errors">
         <p>Errores</p>
         <textarea
            id="errorsArea"
            name="errorsArea"
            value={error ? message : ""}
            readOnly
         ></textarea>
      </div>
   );
}
