const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    this.argument('name', {type: String, required: false});
    const name = this.options.name || 'service';
    const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1);
    const configProps = this.config.get('props') || {};
    const path = this.options.dir ? `app/${this.options.dir}` : (configProps.serviceDir || `app`);
    const props = {
      serviceName: titleCase(name),
      modules: configProps.modules,
      js: configProps.js,
      framework: 'angular1',
      name
    };
    this.copyTemplate(`src/app/service.js`, `src/${path}/${name}.js`, props);
    this.copyTemplate(`src/app/service.spec.js`, `src/${path}/${name}.spec.js`, props);
  }
});
