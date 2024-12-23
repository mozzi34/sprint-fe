"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Document;
const document_1 = require("next/document");
function Document() {
    return (<document_1.Html lang='en'>
      <document_1.Head>
        <link rel='icon' href='../public/favicon.ico' type='image/x-icon'/>
      </document_1.Head>
      <body>
        <document_1.Main />
        <document_1.NextScript />
      </body>
    </document_1.Html>);
}
