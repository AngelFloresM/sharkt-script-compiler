function makeTable(body, scope) {
   const symbolTable = [];
   try {
      body.forEach((ele) => {
         if (hasBody(ele.type)) {
            symbolTable.push(makeTable(ele.body, ele.name));
         } else if (ele.type === "var_definition") {
            if (isAlreadyDeclared(ele, symbolTable))
               throw new Error(
                  `SyntaxError: redeclaration of '${ele.var_name}' inside '${scope}' scope`
               );
            symbolTable.push(makeVarDefinition(ele, scope));
         }
      });
   } catch ({ message }) {
      throw Error(message);
   }
   return symbolTable;
}

function assignValue(ast, table) {
   try {
      ast.forEach((astEle) => {
         if (astEle.type === "var_definition") {
            table.forEach((variable) => {
               if (variable.var_name === astEle.var_name) {
                  variable.value = resolveOperation(astEle.value);
               }
            });
         } else if (astEle.type === "var_assignment") {
            let found = false;
            table.forEach((variable) => {
               if (variable.var_name === astEle.var_name)
                  if (!astEle.reassignable)
                     throw new Error(
                        `TypeError: '${astEle.var_name}' in '${variable.scope}' scope can not be reassigned`
                     );
               variable.value = resolveOperation(astEle.value);
               found = true;
            });
            if (!found)
               throw new Error(
                  `Reference Error: '${astEle.var_name}' variable is not defined`
               );
         } else if (astEle.type === "var_reference") {
            let found = false;
            table.forEach((variable) => {
               if (variable.var_name === astEle.var_name) found = true;
            });
            if (!found)
               throw new Error(
                  `Reference Error: '${astEle.var_name}' variable is not defined`
               );
         }
      });
   } catch ({ message }) {
      throw Error(message);
   }
   return table;
}

function hasBody(type) {
   return type === "func_definition" || type === "while_loop";
}

function resolveOperation(operation) {
   try {
      if (typeof operation === "object") {
         if (typeof operation.left !== typeof operation.right) {
            throw new Error("Incompatible Types Operation");
         }
         if (operation.operator === "+")
            return (
               resolveOperation(operation.left) +
               resolveOperation(operation.right)
            );
         if (operation.operator === "-")
            return (
               resolveOperation(operation.left) -
               resolveOperation(operation.right)
            );
         if (operation.operator === "*")
            return (
               resolveOperation(operation.left) *
               resolveOperation(operation.right)
            );
         if (operation.operator === "/")
            return (
               resolveOperation(operation.left) /
               resolveOperation(operation.right)
            );
         if (operation.operator === "%")
            return (
               resolveOperation(operation.left) %
               resolveOperation(operation.right)
            );
      }
      return convertValue(operation);
   } catch ({ message }) {
      throw Error(message);
   }
}

function makeVarDefinition(statement, scope) {
   return {
      var_name: statement.var_name,
      reassignable: !statement.final,
      value: undefined,
      scope,
   };
}

function isAlreadyDeclared(declaration, table) {
   return table.some(({ var_name }) => var_name === declaration.var_name);
}

function convertValue(value) {
   if (value === "true") return true;
   if (value === "false") return false;
   if (value === "null") return null;
   if (typeof value === "number") return value;
   if (typeof value === "string") return value.slice(1, -1);
}

module.exports = { makeTable, assignValue };
