import React, { useState } from "react";
import Code from "./Code";
import Analyzers from "./AnalyzersArea";
import Errors from "./Errors";
import "./Body.css";

export default function Body() {
   const [code, setCode] = useState("");
   const [error, setError] = useState({
      error: false,
      message: "",
   });

   return (
      <div className="body">
         <Code changeCode={setCode} />
         <Analyzers code={code} setError={setError} />
         <Errors errors={error} />
      </div>
   );
}
