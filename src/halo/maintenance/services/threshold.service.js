import httpInstance from "../../../shared/services/http.instance.js";

export class ThresholdService{
    resourceEndpoint = import.meta.env.VITE_EFFICIENCY_RECORDS_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }
}