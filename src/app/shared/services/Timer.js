export default function ($interval, Observable) {
    var observable = new Observable();

    var interval;
    var isTicking = false;

    observable.start = () => {
        interval = $interval(() => {
            observable.next();
        }, 1000);

        isTicking = true;
    }

    observable.isTicking = () => isTicking;

    observable.stop = () => {
        interval();
    }

    return observable;
}