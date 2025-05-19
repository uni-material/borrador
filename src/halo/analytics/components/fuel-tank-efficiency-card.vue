<template>
  <pv-card>
    <!-- Header con el tipo de tanque -->
    <template #header>
      <h3>{{ fuelTank.type }}</h3>
    </template>

    <!-- Contenido con los indicadores estadísticos -->
    <div class="card-content">
      <div class="statistic">
        <span class="label">Buses Count:</span>
        <span class="value">{{ fuelTank.busesCount }}</span>
      </div>
      <div class="statistic">
        <span class="label">Average Km Per Gallon:</span>
        <span class="value">{{ averageKmPerGallon }}</span>
      </div>
    </div>

    <!-- Footer con issues y última fecha -->
    <template #footer>
      <div class="footer-statistic">
        <span class="label">Reported Issues:</span>
        <span class="value">{{ reportedIssues }}</span>
      </div>
      <div class="footer-statistic">
        <span class="label">Last Report:</span>
        <span class="value">{{ lastReportText }}</span>
      </div>
    </template>
  </pv-card>
</template>

<script>
export default {
  name: "FuelTankTypeEfficiency",
  props: {
    fuelTank: {
      type: Object,
      required: true,
    },
  },
  computed: {
    averageKmPerGallon() {
      const avg = this.fuelTank.averageKmPerGallon;
      return avg !== null && avg !== undefined ? avg.toFixed(2) : "0.00";
    },
    reportedIssues() {
      return this.fuelTank.reportedIssues ?? 0;
    },
    lastReportText() {
      if (!this.fuelTank.lastReport) return "No issues";
      const date = new Date(this.fuelTank.lastReport);
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped>
.card-content {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.statistic {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
}

.label {
  font-weight: 600;
}

.value {
  font-weight: 400;
}

.footer-statistic {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.3rem;
}
</style>