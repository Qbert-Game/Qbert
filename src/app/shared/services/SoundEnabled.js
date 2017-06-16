export default function () {
    var soundEnabled = true;
    
    return {
        get: () => soundEnabled,
        set: (value) => {
            soundEnabled = value;
        }
    }
}