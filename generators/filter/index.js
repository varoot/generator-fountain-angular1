const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    this.argument('name', {type: String, required: false});
    const name = this.options.name || 'filter';
    const lowerCase = string => string.charAt(0).toLowerCase() + string.slice(1);
    const configProps = this.config.get('props') || {};
    const path = this.options.dir ? `app/${this.options.dir}` : (configProps.filterDir || `app`);
    const props = {
      filterName: lowerCase(name),
      modules: configProps.modules,
      js: configProps.js,
      framework: 'angular1',
      name
    };
    this.copyTemplate(`src/app/filter.js`, `src/${path}/${name}.js`, props);
    this.copyTemplate(`src/app/filter.spec.js`, `src/${path}/${name}.spec.js`, props);
  }
});
