export default async function ($scope, SomeService, MockedResource) {
    console.log('Hello from home!');

    var res = await MockedResource.get().$promise;
    console.log('Mocked resource', res);
}