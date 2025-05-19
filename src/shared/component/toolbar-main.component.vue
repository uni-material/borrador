<script>
export default {
  name: "toolbar-main",
  data() {
    return {
      currentLang: 'en'
    };
  },
  methods: {
    changeLanguage(lang) {
      this.currentLang = lang;
      // Aquí puedes emitir un evento o llamar a tu lógica de i18n
      this.$emit('language-changed', lang);
    }
  }
}
</script>

<template>
  <pv-toolbar>
    <template #start>
      <span class="toolbar-title">FIRSTstudent Inc.</span>
    </template>

    <template #end>
      <pv-button
          label="EN"
          class="p-button-text"
          :disabled="currentLang === 'en'"
          @click="changeLanguage('en')"
      />
      <pv-button
          label="ES"
          class="p-button-text"
          :disabled="currentLang === 'es'"
          @click="changeLanguage('es')"
      />
    </template>
  </pv-toolbar>
</template>

<style scoped>

</style>