declare module "esbuild-plugin-inline-css" {
  import { Plugin } from "esbuild";
  function inlineCss(): Plugin;
  export default inlineCss;
}
