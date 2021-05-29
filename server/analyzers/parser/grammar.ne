@{%
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
%}

@lexer lexer

program -> statements
   {% 
      (d) => {
         return {
            type: 'program',
            body: d[0]
         }
      }
   %}

statements 
   -> null   
      {% 
         () => [] 
      %}
   |  statement 
      {% 
         (d) => [d[0]]
      %}
   | statement _ nl _ statements
      {%
         (d) => [d[0], ...d[4]]
      %}
   | _ nl _ statements
      {%
         (d) => [d[0], ...d[3]]
      %}

statement 
   -> func_declaration     {% d => d[0] %}
   |  func_call            {% d => d[0] %}
   |  var_definition       {% d => d[0] %} 
   |  var_assignment       {% d => d[0] %} 
   |  line_comment         {% d => d[0] %} 
   |  while_loop           {% d => d[0] %}
   |  if_statement         {% d => d[0] %}
   |  return_statement     {% d => d[0] %}

func_declaration -> "func" __ %identifier "(" _ parameter_list _ ")" _ code_block
      {%
         d => ({
               type: "func_definition",
               name: convertToken(d[2]),
               parameters: d[5],
               body: d[9],
         })
      %}

func_call -> %identifier "(" _ parameter_list _ ")"
       {%
         d => ({
               type: "func_call",
               func_name: convertToken(d[0]),
               arguments: d[3],
         })
      %}

parameter_list 
   -> null
      {% () => [] %}
   |  expression 
      {% d => [d[0]] %}
   |  expression _ "," _ parameter_list
      {%
         d => [d[0], ...d[4]]
      %}


code_block -> "{" nl _ statements _ nl "}"
      {%
         (d) => ({
            type: "code_block",
            statements: d[3],
         })
      %}

return_statement -> "return" __ expression
      {%
         d => ({
            type: "return_statement",
            value: d[2],
         })
      %}

while_loop -> "while" _ "(" _ boolean_expression _ ")" _ code_block
   {%
      d => ({
            type: "while_loop",
            condition: d[4],
            body: d[8],
      })
   %}

if_statement
   -> "if" _ "(" _ boolean_expression _ ")" _ code_block
      {%
         d => ({
               type: "if_statement",
               condition: d[4],
               consequent: d[9],
         })
      %}
   |  "if" _ "(" _ boolean_expression _ ")" _ code_block _ "else" _ code_block
      {%
         d => ({
               type: "if_statement",
               condition: d[4],
               consequent: d[9],
               alternate: d[13],
         })
      %}
   |  "if" _ "(" _ boolean_expression _ ")" _ code_block _ "else" __ if_statement
      {%
         d => ({
               type: "if_statement",
               condition: d[4],
               consequent: d[9],
               alternate: d[13],
         })
      %}

var_definition 
   -> var_type __ %identifier _ "=" _ expression 
      {% 
         d => ({
            type: "var_definition",
            final: d[0],
            var_name: convertToken(d[2]),
            value: d[6]
         })
      %}
   |  var_type __ %identifier _ "=" _ additive_expression 
      {% 
         d => ({
            type: "var_definition",
            final: d[0],
            var_name: convertToken(d[2]),
            value: d[6]
         })
      %}

var_assignment 
   -> %identifier _ "=" _ expression
      {% 
         d => ({
            type: "var_assignment",
            var_name: convertToken(d[0]),
            value: d[4]
         })
      %}
   | %identifier _ "=" _ additive_expression
      {% 
         d => ({
            type: "var_assignment",
            var_name: convertToken(d[0]),
            value: d[4]
         })
      %}

additive_expression
    -> multiplicative_expression _
      {%
         id
      %}  
    |  multiplicative_expression _ [+-] _ additive_expression _
      {%
         (d) => ({
            type: 'aritmetic_operation',
            operation: 'addition',
            operator: convertToken(d[2]),
            left: d[0],
            right: d[4]
         })
      %}

multiplicative_expression
    -> unary_expression _   
      {%
         id
      %} 
    |  unary_expression _ [*/%] _ multiplicative_expression _
      {%
         (d) => ({
            type: 'aritmetic_operation',
            operation: 'multiplication',
            operator: convertToken(d[2]),
            left: d[0],
            right: d[4]
         })
      %}

unary_expression
    -> expression {% id %}


var_type
   -> "const"        {% convertVarType %}
   | "var"           {% convertVarType %}

expression 
   -> %identifier    
      {%
         d => ({
               type: "var_reference",
               var_name: convertToken(d[0]),
         })
      %}
   | literal         {% id %}

boolean_expression
   -> comparison_expression  
      {% id %}
   |  comparison_expression _ boolean_operator _ boolean_expression
      {%
         d => ({
               type: "boolean_operation",
               operator: d[2],
               left: d[0],
               right: d[4],
         })
      %}

comparison_expression
   -> additive_expression
      {% id %}
   |  additive_expression _ logic_opeartor _ comparison_expression
      {%
         d => ({
               type: "comparison_expression",
               operator: d[2],
               left: d[0],
               right: d[4],
         })
      %}

boolean_operator 
   -> "or"        {% convertTokenId %}
   |  "and"       {% convertTokenId %}

logic_opeartor 
   -> ">"         {% convertTokenId %}
   | ">="         {% convertTokenId %}
   | "<"          {% convertTokenId %}
   | "<="         {% convertTokenId %}
   | "=="         {% convertTokenId %}
   | "!="         {% convertTokenId %}

literal 
   -> %string     {% convertTokenId %}
   |  %number     {% convertTokenId %}
   | "TRUE"       {% convertTokenId %}
   | "FALSE"      {% convertTokenId %}
   | "null"       {% convertTokenId %}

line_comment -> %comment 
   {% 
      d => ({
         type: "line_comment",
         value: convertTokenId(d)
      })
   %} 

__ -> %ws:+

_ -> %ws:*

nl -> %nl