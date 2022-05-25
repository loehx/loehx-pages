const { marked } = require("marked");

export default (md: string) => {
  if (!md) return md;
  return marked(md);
};
