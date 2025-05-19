export class Issue {
    constructor(data) {
        this.id = data.id;
        this.busId = data.busId;
        this.issueType = data.issueType;
        this.registeredAt = new Date(data.registeredAt);
    }
}