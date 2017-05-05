import uuid from 'utils/uuid';

export default class Field {
    constructor({ row, column, stepsToTarget }) {
        this.id = uuid();

        this.colors = App.defaults.fieldColors;
        this.stepsToTarget = stepsToTarget;
        this.visitors = [];

        this.qbertVisits = 0;
        this.currentColor = this.colors[this.qbertVisits];

        this.coordinates = { row, column };
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

        setTimeout(() => {
            this.currentColor = this.colors[++this.qbertVisits];

            if (this.qbertVisits === this.stepsToTarget) {
                this.onTargetReachedCallback();
            }
        }, 100);
    }

    getPosition() {
        var position = $(`#${this.id}`).offset();
        position.top -= 10;
        position.left += 20;

        return position;
    }

    onTargetReached(callback) {
        this.onTargetReachedCallback = callback;
    }
}