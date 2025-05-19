<script>

import ToolbarMain from "./shared/component/toolbar-main.component.vue";

export default {
  name: 'app',
  components: {ToolbarMain},
}
</script>

<template>
  <div class="min-h-screen flex flex-column">
    <toolbar-main></toolbar-main>
    <main class="p-4 flex-1">
      <router-view></router-view>
    </main>
  </div>
</template>