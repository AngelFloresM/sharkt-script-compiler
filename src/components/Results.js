import React, { useState, useEffect } from "react";
import Lexer from "./analyzers/Lexer";
import Parser from "./analyzers/Parser";
import Semantic from "./analyzers/Semantic";

export default function Results({ type, results, setError }) {
   // const [ast, setAst] = useState("");
   // const [tokensList, setTokensList] = useState([]);

   // useEffect(() => {
   //    axios
   //       .post(`http://localhost:8080/${type}`, {
   //          textCode,
   //       })
   //       .then((response) => console.log(response));
   // }, [])

   // useEffect(() => {
   //    if (performAnalysis) {
   //       setTextCode(code);
   //    }
   // }, [performAnalysis, code]);

   // useEffect(() => {
   //    // if (type === "lexico")
   //    axios
   //       .post(`http://localhost:8080/${type}`, {
   //          textCode,
   //       })
   //       .then((response) => console.log(response));
      // .then((data) => {
      //    const { result, error, message } = data;
      //    console.log(result);
      //    setError({ error, message });
      //    setTokensList(result);
      // });
      // else if (type === "sintactico")
      //    fetch(`http://localhost:8080/${type}`, {
      //       method: "POST",
      //       body: textCode,
      //       headers: {
      //          "Content-Type": "text/plain",
      //       },
      //    })
      //       .then((response) => response.json())
      //       .then((data) => {
      //          const { result, error, message } = data;
      //          console.log(message);
      //          setError({ error, message });
      //          setAst(result);
      //       });
      // else if (type === "semantico")
   // }, [textCode, type]);

   return (
      <div className="results">
         <p>Resultados:</p>
         <div className="results-area">
            {type === "lexico" ? (
               <Lexer results={results} />
            ) : type === "sintactico" ? (
               <Parser results={results} />
            ) : (
               <Semantic />
            )}
         </div>
      </div>
   );
}
