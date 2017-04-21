import uuid from 'utils/uuid';

export default class Field {
    constructor({ row, column }) {
        this.id = uuid();

        this.colors = ["blue", "red", "yellow", "green"];
        this.stepsToTarget = 2;
        this.visitors = [];

        this.qbertVisits = 0;
        this.currentColor = this.colors[this.qbertVisits];

        this.coordinates = { row, column };
    }

    addVisitor({ type, id }) {

    }

    removeVisitor({ id }) {

    }

    changeColor() {
        if (this.qbertVisits === this.stepsToTarget) {
            return;
        }

        this.currentColor = this.colors[++this.qbertVisits];

        if (this.qbertVisits === this.stepsToTarget) {
            console.log('target Reached');
        }
    }

    getPosition() {
        return document.getElementById(this.id);
    }
}