const lexer = require("./lexer/Lexer");
const nearley = require("nearley");
const grammar = require("../analyzers/parser/grammar");

function performLexer(textCode) {
   let token;
   let tokenList = [];
   try {
      tokenList.push({ type: "Type", value: "Value" });
      lexer.reset(textCode);
      while ((token = lexer.next())) {
         const { type, value } = token;
         tokenList.push({ type, value });
      }
      return {
         result: tokenList,
         error: false,
         message: "",
      };
   } catch (error) {
      const { message } = error;
      const messageError = message
         .replace("syntax", "token")
         .replace("invalid", "Invalid");
      return {
         result: [{ type: "Type", value: "Value" }],
         error: true,
         message: messageError,
      };
   }
}

function performParser(textCode) {
   const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
   try {
      parser.feed(textCode);
      return {
         result: parser.results[0],
         error: false,
         message: "",
      };
   } catch (err) {
      const { token } = err;
      const { line, col, type, value } = token;
      return {
         result: [],
         error: true,
         message: `Syntax error at line ${line} col ${col} \nToken '${type}' with value '${value}'`,
      };
   }
}

function performSemantic() {
   return "Semantic";
}

module.exports = { performLexer, performParser, performSemantic };
