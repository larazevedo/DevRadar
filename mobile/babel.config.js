// Babel: converte versões mais recentes do JS em versões que o navegador entenda

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
