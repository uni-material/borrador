<template>
  <div>
    <h2>Efficiency Analytics</h2>
    <div class="grid">
      <FuelTankTypeEfficiency
          v-for="threshold in thresholds"
          :key="threshold.id"
          :fuelTankType="threshold.fuelTankType"
      />
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>


<script>


import FuelTankTypeEfficiency from "../../halo/analytics/components/FuelTankTypeEfficiency.vue";

import {ThresholdService} from "../../halo/maintenance/services/threshold.service.js";
const thresholdService = new ThresholdService();

export default {
  name: 'HomeView',
  components: {FuelTankTypeEfficiency},
  data() {
    return {
      thresholds: [],
      error: null,
    };
  },
  async mounted() {
    try {
      const res = await thresholdService.getAll();
      this.thresholds = res.data;
    } catch (e) {
      this.error = 'Error loading thresholds: ' + e.message;
    }
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
