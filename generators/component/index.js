const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    this.argument('name', {type: String, required: false});
    const name = this.options.name || 'component';
    const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1);
    const lowerCase = string => string.charAt(0).toLowerCase() + string.slice(1);
    const configProps = this.config.get('props') || {};
    const path = this.options.dir ? `app/${this.options.dir}` : (configProps.componentDir || `app`);
    const props = {
      componentName: lowerCase(name),
      className: titleCase(name),
      modules: configProps.modules,
      js: configProps.js,
      framework: 'angular1',
      name,
      templateUrl: configProps.modules === 'systemjs' ? `src/${path}/${name}.html` : `${path}/${name}.html`,
      relativeTemplateUrl: `./${name}.html`
    };
    this.copyTemplate(`src/app/component.js`, `src/${path}/${name}.js`, props);
    this.copyTemplate(`src/app/component.spec.js`, `src/${path}/${name}.spec.js`, props);
    this.copyTemplate('src/app/component.html', `src/${path}/${name}.html`, props);
  }
});
