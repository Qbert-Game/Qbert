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
    }

    removeVisitor({ id }) {
        this.visitors = this.visitors.filter((x) => x.id !== id);
    }

    newQbertVisit() {
        if (this.qbertVisits === this.stepsToTarget) {
            return;
        }

        this.onColorChangedCallback();

        setTimeout(() => {
            this.currentColor = this.colors[++this.qbertVisits];

            if (this.qbertVisits === this.stepsToTarget) {
                this.onTargetReachedCallback();
            }
        }, 100);
    }

    revertColor(){
        if (this.qbertVisits === 0)
            return;

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

    getVisitors(){
        return this.visitors;
    }

    getCoordinates(){
        return this.coordinates;
    }

    onTargetReached(callback) {
        this.onTargetReachedCallback = callback;
    }

    onColorChanged(callback) {
        this.onColorChangedCallback = callback;
    }

    onColorReverted(callback) {
        this.onColorRevertedCallback = callback;
    }
}