export default function buildPartials(name, component) {
    var controller = component.controller || function () { };
    var template = component.template;

    App.directive(name, () => {
        return {
            restrict: 'E',
            controller,
            template
        }
    });

    if (component.partials) {
        for (var componentName in component.partials) {
            var component = component.partials[componentName];
            buildPartials(componentName, component);
        }
    }
};