import moo from "moo";

export const rules = {
   ws: /[ \t]+/,
   comment: {
      match: /\/\/.*?$/,
      value: s => s.substring(2)
   },
   number: {
      match: /0|[1-9][0-9]*/,
      value: Number,
   },
   string: /"(?:\\["\\]|[^\n"\\])*"/,
   boolean: ["TRUE", "FALSE"],
   lparan: "(",
   rparan: ")",
   lbrace: "{",
   rbrace: "}",
   coma: ",",
   colon: ":",
   lte: "<=",
   lt: "<",
   gte: ">=",
   gt: ">",
   eq: "==",
   neq: "!=",
   assignment: "=",
   plus: "+",
   minus: "-",
   multiply: "*",
   divide: "/",
   modulo: "%",
   identifier: {
      match: /[_a-zA-z][_a-zA-Z0-9]{0,30}/,
      keyword: moo.keywords({
         const: "const",
         var: "var",
         null: "null",
         if: "if",
         else: "else",
         while: "while",
         return: "return",
         func: "func",
         or: "or",
         and: "and",
      }),
   },
   nl: {
      match: /\n/,
      lineBreaks: true,
   },
};
