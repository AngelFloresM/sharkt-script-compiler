const lexer = require("./lexer/Lexer");
const nearley = require("nearley");
const grammar = require("../analyzers/parser/grammar");
const { makeTable, assignValue } = require("./semantic/Semantic");

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
   } catch ({ message }) {
      return {
         result: [],
         error: true,
         message: message.split(":\n\n")[0],
      };
   }
}

function performSemantic(ast, statementScope) {
   let table;
   try {
      table = makeTable(ast, statementScope);
      // console.log(table)
      table = assignValue(ast, table)
      console.log(table)
      console.log(ast)
   } catch ({ message }) {
      return {
         result: "",
         error: true,
         message,
      };
   }
   return {
      result: "All Gucci",
      error: true,
      message: "",
   };
}

module.exports = { performLexer, performParser, performSemantic };
