import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

const info = require("./package.json");

export default {
    input: "src/vnjs.js",
    output: {
        file: "dist/vnjson.js",
        name: 'vnjs',
        format: 'es',
        sourcemap: true
    },    
    plugins: [resolve(), babel()],

};
