export default function () {
    return {
        get: function () {
            return App.mockPromise(App.mocks.resource.get);
        }
    }
}