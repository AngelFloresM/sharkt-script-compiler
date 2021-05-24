import moo from "moo";
import {rules} from '../scripts/Rules'

const lexer = moo.compile(rules);

export { lexer };
