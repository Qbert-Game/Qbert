export default function ($interval) {
    return {
        start: () => {
            $interval(() => {
                console.log('tick');
            }, 1000);
        }
    }
}