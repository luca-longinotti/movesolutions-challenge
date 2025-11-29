<script setup>
import {ref, onMounted} from 'vue';
import SensorTable from '../components/SensorsTable.vue';

const sensors = ref([]);
onMounted(async () => {
  try {
    const res = await fetch('/data/sensors.json');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    sensors.value = await res.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});
</script>

<template>
    <SensorTable :sensors="sensors" />
</template>