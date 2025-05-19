import httpInstance from "../../../shared/services/http.instance.js";

export class IssueService {
    resourceEndpoint = import.meta.env.VITE_ISSUES_ENDPOINT_PATH;

    getAll() {
        return httpInstance.get(this.resourceEndpoint);
    }
    getById(id) {
        return httpInstance.get(`${this.resourceEndpoint}/${id}`);
    }
}