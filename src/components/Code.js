import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-monokai";

export default function Code({ changeCode }) {
   return (
      <div className="code">
         <p>Code:</p>
         <AceEditor
            placeholder="Start Coding!"
            theme="monokai"
            style={{
               width: "100%",
               height: "93%",
               borderRadius: "10px",
               backgroundColor: "#313131",
               boxSizing: "border-box",
            }}
            fontSize={16}
            onChange={(currentCode) => changeCode(currentCode)}
         />
      </div>
   );
}
