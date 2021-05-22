import React from "react";

export default function Token({ type, value }) {
   return (
      <div className="token-item">
         <p>{type}</p>
         <p>{value}</p>
      </div>
   );
}
