import uuid from 'utils/uuid';

export default class Field {
    constructor({ row, column, stepsToTarget, $q, $rootScope }) {
        this.id = uuid();

        this.colors = App.defaults.fieldColors;
        this.stepsToTarget = stepsToTarget;
        this.visitors = [];

        this.qbertVisits = 0;
        this.currentColor = this.colors[this.qbertVisits];

        this.coordinates = { row, column };
        this.$q = $q;
        this.$rootScope = $rootScope;
    }

    addVisitor({ type, id }) {
        this.visitors.push({ type, id });

        if (type === 'qbert') {
            this.newQbertVisit();
        }

        var monsters = this.visitors.filter(v => v.type !== 'qbert');
        var fieldHasQbert = this.visitors.filter(v => v.type === 'qbert')[0];

        var killMonster = () => {
            this.onMonsterKilledCallback(id, this);
            this.removeVisitor({ id });
        }

        setTimeout(() => {
            switch (type) {
                case 'qbert': {
                    for (let monster of monsters) {
                        if (monster.type === 'sam') {
                            this.onMonsterKilledCallback(monster.id, this);
                            this.removeVisitor({ id: monster.id });
                        } else {
                            this.onQbertKilledCallback();
                        }
                    }
                    break;
                }
                case 'sam': {
                    this.revertColor();

                    if (this.coordinates.row === 6) {
                        killMonster();
                    }

                    if (fieldHasQbert) {
                        this.onMonsterKilledCallback(id, this);
                        this.removeVisitor({ id });
                    }
                    break;
                }
                case 'ball': {
                    if (this.coordinates.row === 6) {
                        killMonster();
                    }

                    if (fieldHasQbert) {
                        this.onQbertKilledCallback();
                    }
                    break;
                }
                case 'coily': {
                    if (fieldHasQbert) {
                        this.onQbertKilledCallback();
                    }
                }
            }
        }, 100);
    }

    removeVisitor({ id }) {
        this.visitors = this.visitors.filter((x) => x.id !== id);
    }

    newQbertVisit() {
        if (this.qbertVisits === this.stepsToTarget) {
            return;
        }

        setTimeout(() => {
            this.currentColor = this.colors[++this.qbertVisits];
            this.onColorChangedCallback();

            if (this.qbertVisits === this.stepsToTarget) {
                this.onTargetReachedCallback();
            }
        }, 100);
    }

    revertColor() {
        if (this.qbertVisits === 0)
            return;
        if (this.qbertVisits === this.stepsToTarget)
            this.onTargetLostCallback();

        this.onColorRevertedCallback();

        setTimeout(() => {
            this.currentColor = this.colors[--this.qbertVisits];
        }, 100);
    }

    getPosition() {
        var { $rootScope, $q } = this;
        var deferred = $q.defer();
        var position = $(`#${this.id}`).offset();

        if (position) {
            position.top -= 10;
            position.left += 20;

            return $q.when(position);
        }

        var unwatch = $rootScope.$watch(() => $(`#${this.id}`).offset(), (position) => {
            if (!position) {
                return;
            }

            position.top -= 10;
            position.left += 20;

            unwatch();
            deferred.resolve(position);
        });

        return deferred.promise;
    }

    getVisitors() {
        return this.visitors;
    }

    getCoordinates() {
        return this.coordinates;
    }

    onTargetReached(callback) {
        this.onTargetReachedCallback = callback;
    }

    onTargetLost(callback) {
        this.onTargetLostCallback = callback;
    }

    onColorChanged(callback) {
        this.onColorChangedCallback = callback;
    }

    onColorReverted(callback) {
        this.onColorRevertedCallback = callback;
    }

    onQbertKilled(callback) {
        this.onQbertKilledCallback = callback;
    }

    onMonsterKilled(callback) {
        this.onMonsterKilledCallback = callback;
    }
}