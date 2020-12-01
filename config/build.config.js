const zipdir = require('zip-dir');
const del = require('del');
const path = require('path');

const data = require(path.join('..', 'package.json'));
const appVersion = data.version;
const appName = data.name;
const buildType = process.env.REACT_APP_BUILD || '';
const saveTo = `build/${appName}_${buildType}_${appVersion}.zip`;

del.sync(['build/*.zip']);
zipdir('build/', {saveTo}, () => {
});


