<script setup>
import {ref, onMounted} from 'vue';
import { generateMeasurements } from '../utils/generateMeasurements';
import SensorTable from '../components/SensorsTable.vue';
import SensorChart from '../components/SensorsChart.vue';

const sensors = ref([]);
const selectedSensor = ref(null);
const selectedSensorId = ref(null);

function onSelectSensor(sensor) {
    selectedSensor.value = sensor;
    selectedSensorId.value = sensor.id;
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
    <div class="w-full text-center mb-4">
        <h1 class="text-3xl font-bold">Sensor Dashboard</h1>
        <p class="text-gray-600 italic">Monitor sensor measurements and statuses</p>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-6">
        <div class="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-4">
            <SensorTable
                :sensors="sensors"
                :selected="selectedSensorId"
                @select="onSelectSensor"
            />
        </div>
        <div class="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-4">
            <SensorChart v-if="selectedSensor" :sensor="selectedSensor" />

            <div v-else class="text-gray-400 italic text-center w-full">
                Please select a sensor to view its measurements.
            </div>
        </div>
    </div>

</template>