<template>
  <div class="card">
    <header class="card-header">
      <h3>{{ fuelTankType }}</h3>
    </header>
    <section class="card-content">
      <p><strong>Buses Count:</strong> {{ busesCount }}</p>
      <p><strong>Average Km Per Gallon:</strong> {{ averageKmPerGallon }}</p>
    </section>
    <footer class="card-footer">
      <p><strong>Reported Issues:</strong> {{ reportedIssues }}</p>
      <p><strong>Last Report:</strong> {{ lastReport }}</p>
    </footer>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import {ThresholdService} from "../../maintenance/services/threshold.service.js";
import {EfficiencyRecordService} from "../../maintenance/services/efficiency.service.js";
import {IssueService} from "../../maintenance/services/issue.service.js";
const efficiencyRecordService = new EfficiencyRecordService();
const issueService = new IssueService();

export default {

  name: "FuelTankTypeEfficiency",
  props: ['fuelTankType'],
  data() {
    return {
      busesCount: 0,
      averageKmPerGallon: '0.00',
      reportedIssues: 0,
      lastReport: 'No issues',
      error: null,
    };
  },
  async mounted() {
    await this.loadAnalytics();
  },
  methods: {
    async loadAnalytics() {
      this.error = null;
      try {
        const [efficiencyRes, issuesRes] = await Promise.all([
          efficiencyRecordService.getAll(),
          issueService.getAll(),
        ]);

        const efficiencyRecords = efficiencyRes.data;
        const issues = issuesRes.data;

        const records = efficiencyRecords.filter(
            (r) => r.fuelTankType === this.fuelTankType
        );

        const uniqueBusIds = [...new Set(records.map((r) => r.busId))];
        this.busesCount = uniqueBusIds.length;

        if (records.length > 0) {
          const sum = records.reduce(
              (acc, r) => acc + r.averageKmPerGallon,
              0
          );
          this.averageKmPerGallon = (sum / records.length).toFixed(2);
        } else {
          this.averageKmPerGallon = '0.00';
        }

        const relatedIssues = issues.filter((issue) =>
            uniqueBusIds.includes(issue.busId)
        );
        this.reportedIssues = relatedIssues.length;

        if (relatedIssues.length > 0) {
          const latest = relatedIssues.reduce((max, issue) => {
            const date = new Date(issue.registeredAt);
            return date > max ? date : max;
          }, new Date(0));
          this.lastReport = latest.toLocaleString();
        } else {
          this.lastReport = 'No issues';
        }
      } catch (e) {
        this.error = 'Error loading analytics: ' + e.message;
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: 2px 2px 5px #aaa;
}
.card-header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}
.card-content p,
.card-footer p {
  margin: 0.3rem 0;
}
.card-footer {
  border-top: 1px solid #ddd;
  margin-top: 1rem;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>