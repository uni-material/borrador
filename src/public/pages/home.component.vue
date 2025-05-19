<template>
  <div>
    <h2>Efficiency Analytics</h2>
    <div class="grid-container">
      <fuel-tank-type-efficiency
          v-for="tank in fuelTanks"
          :key="tank.type"
          :fuelTank="tank"
      />
    </div>
  </div>
</template>

<script>


import FuelTankTypeEfficiency from "../../halo/analytics/components/fuel-tank-efficiency-card.vue";
import {EfficiencyRecordService} from "../../halo/maintenance/services/efficiency.service.js";

export default {
  name: 'HomeView',
  components: {FuelTankTypeEfficiency},
  data() {
    return {
      fuelTanks: [],
    };
  },
  async created() {
    const service = new EfficiencyRecordService();
    const response = await service.getAll();

    const grouped = {};

    response.data.forEach((record) => {
      const type = record.fuelTankType;

      if (!grouped[type]) {
        grouped[type] = {
          type,
          busesSet: new Set(),
          totalKmPerGallon: 0,
          countKmRecords: 0,
          reportedIssues: 0,
          lastReport: null,
        };
      }

      grouped[type].busesSet.add(record.busId);

      if (record.averageKmPerGallon !== null && record.averageKmPerGallon !== undefined) {
        grouped[type].totalKmPerGallon += record.averageKmPerGallon;
        grouped[type].countKmRecords++;
      }

      if (record.reportedIssues) {
        grouped[type].reportedIssues += record.reportedIssues;
      }

      if (record.lastReport) {
        const currentDate = new Date(record.lastReport);
        const lastDate = grouped[type].lastReport ? new Date(grouped[type].lastReport) : null;
        if (!lastDate || currentDate > lastDate) {
          grouped[type].lastReport = record.lastReport;
        }
      }
    });

    this.fuelTanks = Object.values(grouped).map((item) => ({
      type: item.type,
      busesCount: item.busesSet.size,
      averageKmPerGallon:
          item.countKmRecords > 0
              ? item.totalKmPerGallon / item.countKmRecords
              : 0,
      reportedIssues: item.reportedIssues,
      lastReport: item.lastReport,
    }));
  },
};
</script>

<style scoped>

</style>
