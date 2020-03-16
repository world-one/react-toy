module.exports = function(api) {
    api.cache(true);
  
    const presets = ["@babel/preset-env", "@babel/preset-react"];
  
    const plugins = [
      ["module-resolver", {
        // "root": ["./"],
        "alias": {
          "@": "./src/views",
          "#": "./src/scss"
        }
      }]
    ];
  
    return {
      presets,
      plugins
    };
  };