import React, { useState } from "react";
import Code from "./Code";
import Analyzers from "./Analizers";
import Errors from "./Erros"
import "./Body.css";

export default function Body() {
   const [code, setCode] = useState("");

   return (
      <div className="body">
         <Code changeCode={setCode} />
         <Analyzers code={code} />
         <Errors/>
      </div>
   );
}
