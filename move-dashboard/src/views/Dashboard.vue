<script setup>
import {ref, onMounted} from 'vue';
import { generateMeasurements } from '../utils/generateMeasurements';
import SensorTable from '../components/SensorsTable.vue';
import SensorChart from '../components/SensorsChart.vue';

const sensors = ref([]);
const selectedSensor = ref(null);

function onSelectSensor(sensor) {
    selectedSensor.value = sensor;
}

async function loadSensors() {
    const res = await fetch('/data/sensors.json');
    const baseSensors = await res.json();

    const enriched = [];

    // Enrich sensors with generated measurements, last value and status
    for (const s of baseSensors) {
        const measurements = generateMeasurements();
        const lastValue = measurements.at(-1).disp_mm;
        
        enriched.push({ 
            ...s,
            measurements,
            lastValue,
            status: lastValue > s.threshold ? 'Alarm' : 'OK'        //check status based on threshold
        });
    }
    
    sensors.value = enriched;
}


onMounted(loadSensors);

</script>

<template>
    <SensorTable
     :sensors="sensors"
     @select="onSelectSensor"
    />

    <SensorChart 
     v-if="selectedSensor"
     :sensor="selectedSensor"
    />

</template>