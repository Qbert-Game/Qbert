import _ from 'lodash';

export default function buildPartials(name, component) {
    component.controller = component.controller || function () { };

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