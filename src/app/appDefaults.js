var levels = [
    {
        addMonsterAfterSteps: 5,
        addCoilyAfterSteps: 20,
        stepsToTarget: 1
    },
    {
        addMonsterAfterSteps: 3,
        addCoilyAfterSteps: 10,
        stepsToTarget: 1
    },
    {
        addMonsterAfterSteps: 5,
        addCoilyAfterSteps: 20,
        stepsToTarget: 2
    },
    {
        addMonsterAfterSteps: 3,
        addCoilyAfterSteps: 10,
        stepsToTarget: 2
    },
    {
        addMonsterAfterSteps: 5,
        addCoilyAfterSteps: 20,
        stepsToTarget: 3
    },
    {
        addMonsterAfterSteps: 3,
        addCoilyAfterSteps: 10,
        stepsToTarget: 3
    }
];

export default {
    fieldColors: ["blue", "red", "yellow", "green"],
    getLevelCfg: (level) => levels[level - 1],
    levels
}