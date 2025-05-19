export class EfficiencyRecord {
    constructor(data) {
        this.id = data.id;
        this.busId = data.busId;
        this.fuelTankType = data.fuelTankType;
        this.averageKmPerGallon = data.averageKmPerGallon;
        this.calculatedAt = new Date(data.calculatedAt);
    }
}
