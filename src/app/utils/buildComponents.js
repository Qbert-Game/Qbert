import partialsBuilder from './builders/partials';

export default function (components) {
    for (var componentName in components) {
        var component = components[componentName];
        partialsBuilder(componentName, component);
    }
}