import q from 'q';

export default function (data) {
    var deffered = q.defer();

    setTimeout(() => {
        deffered.resolve(data);
    });

    return {
        $promise: deffered.promise
    };
}