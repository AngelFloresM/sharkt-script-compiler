// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

   const lexer = require('../lexer/Lexer.js');

   function convertToken(token) {
      return token.value;
   }

   function convertTokenId(d) {
      return convertToken(d[0]);
   }

   function convertVarType(d){
      return d[0].value === 'const'? true: false
   }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess":  
        (d) => {
           return {
              type: 'program',
              body: d[0]
           }
        }
           },
    {"name": "statements", "symbols": [], "postprocess":  
        () => [] 
              },
    {"name": "statements", "symbols": ["statement"], "postprocess":  
        (d) => [d[0]]
              },
    {"name": "statements", "symbols": ["statement", "_", "nl", "_", "statements"], "postprocess": 
        (d) => [d[0], ...d[4]]
              },
    {"name": "statements", "symbols": ["_", "nl", "_", "statements"], "postprocess": 
        (d) => [d[0], ...d[3]]
              },
    {"name": "statement", "symbols": ["func_declaration"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["func_call"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["var_definition"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["var_assignment"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["line_comment"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["while_loop"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["if_statement"], "postprocess": d => d[0]},
    {"name": "statement", "symbols": ["return_statement"], "postprocess": d => d[0]},
    {"name": "func_declaration", "symbols": [{"literal":"func"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}, "_", "code_block"], "postprocess": 
        d => ({
              type: "func_definition",
              name: convertToken(d[2]),
              parameters: d[5],
              body: d[9],
        })
              },
    {"name": "func_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}], "postprocess": 
        d => ({
              type: "func_call",
              func_name: convertToken(d[0]),
              arguments: d[3],
        })
              },
    {"name": "parameter_list", "symbols": [], "postprocess": () => []},
    {"name": "parameter_list", "symbols": ["expression"], "postprocess": d => [d[0]]},
    {"name": "parameter_list", "symbols": ["expression", "_", {"literal":","}, "_", "parameter_list"], "postprocess": 
        d => [d[0], ...d[4]]
              },
    {"name": "code_block", "symbols": [{"literal":"{"}, "nl", "_", "statements", "_", "nl", {"literal":"}"}], "postprocess": 
        (d) => ({
           type: "code_block",
           statements: d[3],
        })
              },
    {"name": "return_statement", "symbols": [{"literal":"return"}, "__", "expression"], "postprocess": 
        d => ({
           type: "return_statement",
           value: d[2],
        })
              },
    {"name": "while_loop", "symbols": [{"literal":"while"}, "_", {"literal":"("}, "_", "boolean_expression", "_", {"literal":")"}, "_", "code_block"], "postprocess": 
        d => ({
              type: "while_loop",
              condition: d[4],
              body: d[8],
        })
           },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "boolean_expression", "_", {"literal":")"}, "_", "code_block"], "postprocess": 
        d => ({
              type: "if_statement",
              condition: d[4],
              consequent: d[9],
        })
              },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "boolean_expression", "_", {"literal":")"}, "_", "code_block", "_", {"literal":"else"}, "_", "code_block"], "postprocess": 
        d => ({
              type: "if_statement",
              condition: d[4],
              consequent: d[9],
              alternate: d[13],
        })
              },
    {"name": "if_statement", "symbols": [{"literal":"if"}, "_", {"literal":"("}, "_", "boolean_expression", "_", {"literal":")"}, "_", "code_block", "_", {"literal":"else"}, "__", "if_statement"], "postprocess": 
        d => ({
              type: "if_statement",
              condition: d[4],
              consequent: d[9],
              alternate: d[13],
        })
              },
    {"name": "var_definition", "symbols": ["var_type", "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess":  
        d => ({
           type: "var_definition",
           final: d[0],
           var_name: convertToken(d[2]),
           value: d[6]
        })
              },
    {"name": "var_definition", "symbols": ["var_type", "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "additive_expression"], "postprocess":  
        d => ({
           type: "var_definition",
           final: d[0],
           var_name: convertToken(d[2]),
           value: d[6]
        })
              },
    {"name": "var_assignment", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess":  
        d => ({
           type: "var_assignment",
           var_name: convertToken(d[0]),
           value: d[4]
        })
              },
    {"name": "var_assignment", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "additive_expression"], "postprocess":  
        d => ({
           type: "var_assignment",
           var_name: convertToken(d[0]),
           value: d[4]
        })
              },
    {"name": "additive_expression", "symbols": ["multiplicative_expression", "_"], "postprocess": 
        id
              },
    {"name": "additive_expression", "symbols": ["multiplicative_expression", "_", /[+-]/, "_", "additive_expression", "_"], "postprocess": 
        (d) => ({
           type: 'aritmetic_operation',
           operation: 'addition',
           operator: convertToken(d[2]),
           left: d[0],
           right: d[4]
        })
              },
    {"name": "multiplicative_expression", "symbols": ["unary_expression", "_"], "postprocess": 
        id
              },
    {"name": "multiplicative_expression", "symbols": ["unary_expression", "_", /[*/%]/, "_", "multiplicative_expression", "_"], "postprocess": 
        (d) => ({
           type: 'aritmetic_operation',
           operation: 'multiplication',
           operator: convertToken(d[2]),
           left: d[0],
           right: d[4]
        })
              },
    {"name": "unary_expression", "symbols": ["expression"], "postprocess": id},
    {"name": "var_type", "symbols": [{"literal":"const"}], "postprocess": convertVarType},
    {"name": "var_type", "symbols": [{"literal":"var"}], "postprocess": convertVarType},
    {"name": "expression", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": 
        d => ({
              type: "var_reference",
              var_name: convertToken(d[0]),
        })
              },
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "boolean_expression", "symbols": ["comparison_expression"], "postprocess": id},
    {"name": "boolean_expression", "symbols": ["comparison_expression", "_", "boolean_operator", "_", "boolean_expression"], "postprocess": 
        d => ({
              type: "boolean_operation",
              operator: d[2],
              left: d[0],
              right: d[4],
        })
              },
    {"name": "comparison_expression", "symbols": ["additive_expression"], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["additive_expression", "_", "logic_opeartor", "_", "comparison_expression"], "postprocess": 
        d => ({
              type: "comparison_expression",
              operator: d[2],
              left: d[0],
              right: d[4],
        })
              },
    {"name": "boolean_operator", "symbols": [{"literal":"or"}], "postprocess": convertTokenId},
    {"name": "boolean_operator", "symbols": [{"literal":"and"}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":">"}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":">="}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":"<"}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":"<="}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":"=="}], "postprocess": convertTokenId},
    {"name": "logic_opeartor", "symbols": [{"literal":"!="}], "postprocess": convertTokenId},
    {"name": "literal", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": convertTokenId},
    {"name": "literal", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": convertTokenId},
    {"name": "literal", "symbols": [{"literal":"TRUE"}], "postprocess": convertTokenId},
    {"name": "literal", "symbols": [{"literal":"FALSE"}], "postprocess": convertTokenId},
    {"name": "literal", "symbols": [{"literal":"null"}], "postprocess": convertTokenId},
    {"name": "line_comment", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess":  
        d => ({
           type: "line_comment",
           value: convertTokenId(d)
        })
           },
    {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "nl", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
