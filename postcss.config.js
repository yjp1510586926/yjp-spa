module.exports = {
  plugins: ["autoprefixer", "postcss-preset-env"],
  "postcss-preset-env": {
    stage: 3,
    features: {
      "nesting-rules": true,
      "custom-properties": true,
      "custom-media-queries": true,
    },
  },
  autoprefixer: {
    overrideBrowserslist: ["> 1%", "last 2 versions", "not dead", "not ie 11"],
    grid: "autoplace",
  },
};
