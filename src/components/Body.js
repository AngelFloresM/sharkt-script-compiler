import React, { useState } from "react";
import Code from "./Code";
import Analyzers from "./Analizers";
import "./Body.css";

export default function Body() {
   const [code, setCode] = useState("");

   function printCode() {
      console.log(code);
   }

   return (
      <div className="body">
         <Code changeCode={setCode} />
         <Analyzers printCode={printCode} code={code} />
      </div>
   );
}
