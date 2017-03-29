import builders from './builders';

export default function (shared) {
    
    for (var sharedType in shared) {
        for (var itemName in shared[sharedType]) {
            var content = shared[sharedType][itemName];
            builders[sharedType](itemName, content);
        }
    }    
}