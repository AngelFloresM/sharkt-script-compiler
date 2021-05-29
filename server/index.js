const express = require("express");
const cors = require("cors");
const {
   performLexer,
   performParser,
   performSemantic,
} = require("./analyzers/functions");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/lexico", (req, res) => {
   const {
      body: { code },
   } = req;
   let data = performLexer(code);
   res.json({
      ...data,
   });
});

app.post("/sintactico", (req, res) => {
   const {
      body: { code },
   } = req;
   let data = performParser(code);
   res.json({
      ...data,
   });
});

app.post("/semantico", (req, res) => {
   const {
      body: { code },
   } = req;
   let data = performSemantic(code);
   res.json({
      ...data,
   });
});

app.listen(8080);
