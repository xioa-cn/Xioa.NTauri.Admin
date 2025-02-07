<template>
  <div class="flow-container">
    <div class="toolbar">
     
    </div>
    <div id="container" class="graph-container"></div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.flow-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.toolbar button {
  margin-right: 8px;
  padding: 4px 8px;
}

.graph-container {
  flex: 1;
  background-color: #f5f5f5;
  min-height: 600px;
}
</style>
