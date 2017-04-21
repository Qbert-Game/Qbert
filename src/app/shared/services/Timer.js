export default function ($interval, Observable) {
    var observable = new Observable();

    var interval;

    observable.start = () => {
        interval = $interval(() => {
            observable.next();
        }, 1000);
    }

    observable.stop = () => {
        interval();
    }

    return observable;
}