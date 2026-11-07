// Metro links the sibling engines (../BYE-Chem_engine, ../BYE-Math_engine) as TypeScript source.
// Bare imports from engine files resolve from this app's node_modules, so there is only ever one React.
const { getDefaultConfig } = require('expo/metro-config');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);
const mathRoot = path.resolve(projectRoot, '../BYE-Math_engine');
const chemRoot = path.resolve(projectRoot, '../BYE-Chem_engine');
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

config.watchFolders = [mathRoot, chemRoot];
config.resolver.extraNodeModules = { 'bye-math-engine': mathRoot, 'bye-chem-engine': chemRoot };
const hidden = [path.join(mathRoot, 'node_modules'), path.join(mathRoot, 'example'), path.join(chemRoot, 'node_modules'), path.join(projectRoot, 'deploy'), path.join(projectRoot, 'dist')]
  .map((d) => new RegExp(`^${escape(d)}[\\\\/]`));
config.resolver.blockList = [].concat(config.resolver.blockList ?? [], hidden);
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];

const engineDirs = [...new Set([mathRoot, chemRoot].flatMap((d) => [d, fs.realpathSync(d)]))].map((d) => d + path.sep);
const appOrigin = path.join(projectRoot, 'package.json');
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const bare = !moduleName.startsWith('.') && !path.isAbsolute(moduleName);
  if (bare && engineDirs.some((d) => context.originModulePath.startsWith(d))) {
    return context.resolveRequest({ ...context, originModulePath: appOrigin }, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
