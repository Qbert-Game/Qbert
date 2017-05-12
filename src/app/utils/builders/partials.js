import _ from 'lodash';

export default function buildPartials(name, component) {
    component.controller = component.controller || function () { };
    component.scope = component.scope || true;

    var directive = _.extend(component, { restrict: 'E' });

    App.directive(name, () => {
        return directive;
    });

    if (component.partials) {
        for (var componentName in component.partials) {
            buildPartials(componentName, component.partials[componentName]);
        }
    }
};