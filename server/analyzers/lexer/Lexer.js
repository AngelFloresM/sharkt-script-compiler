const moo = require("moo");
const rules = require("./Rules");

const lexer = moo.compile(rules);

module.exports = lexer;
