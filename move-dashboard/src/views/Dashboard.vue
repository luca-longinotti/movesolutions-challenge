<script setup>
import {ref, onMounted, computed} from 'vue';
import { generateMeasurements } from '../utils/generateMeasurements';
import SensorTable from '../components/SensorsTable.vue';
import SensorChart from '../components/SensorsChart.vue';
import SummaryCard from '../components/SummaryCard.vue';

const sensors = ref([]);
const selectedSensor = ref(null);
const selectedSensorId = ref(null);

const search = ref('');
const filterStatus = ref('all');
const filterLocation = ref('all');

const filteredSensors = computed(() => {
  return sensors.value
    .filter(sensor => {
      //Text search filter
      const matchesText =
        sensor.name.toLowerCase().includes(search.value.toLowerCase()) ||
        sensor.id.toLowerCase().includes(search.value.toLowerCase());

      //Status filter
      const matchesStatus =
        filterStatus.value === "all" ||
        sensor.status.toLowerCase() === filterStatus.value;

      //Location filter
      const matchesLocation =
        filterLocation.value === "all" ||
        sensor.location === filterLocation.value;

      return matchesText && matchesStatus && matchesLocation;
    });
});

function resetFilters() {
  search.value = "";
  filterStatus.value = "all";
  filterLocation.value = "all";
}

const alarmCount = computed(() => sensors.value.filter(s => s.status === "Alarm").length);

//Overall min and max across all registered measurements (summary cards)
const globalMax = computed(() => {
    const values = sensors.value.flatMap(s => (s.measurements || []).map(m => Number(m.disp_mm) || 0))
    if (!values.length) return 0
    return Math.round(Math.max(...values) * 100) / 100
})

const globalMin = computed(() => {
    const values = sensors.value.flatMap(s => (s.measurements || []).map(m => Number(m.disp_mm) || 0))
    if (!values.length) return 0
    return Math.round(Math.min(...values) * 100) / 100
})


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

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <SummaryCard title="Total sensors" :value="sensors.length">
                    <template #icon>📡</template>
                </SummaryCard>

                <SummaryCard title="In alarm" :value="alarmCount">
                    <template #icon>🚨</template>
                </SummaryCard>

                <SummaryCard title="Maximum value recorded" :value="globalMax">
                    <template #icon>📈</template>
                    <template #meta>mm</template>
                </SummaryCard>

                <SummaryCard title="Minimum value recorded" :value="globalMin">
                    <template #icon>📉</template>
                    <template #meta>mm</template>
                </SummaryCard>
    </div>

    <div class="flex flex-col lg:flex-row items-start gap-6">
        <div class="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-4">
            <div class="flex flex-col lg:flex-row gap-4 mb-4">

                <!-- Text search filter -->
                <input v-model="search" type="text" placeholder="Search..."
                    class="border rounded px-3 py-2 w-full lg:w-1/3" />

                <!-- Status filter -->
                <select v-model="filterStatus" class="border rounded px-3 py-2 w-full lg:w-1/4">
                    <option value="all">---</option>
                    <option value="ok">OK</option>
                    <option value="alarm">Alarm</option>
                </select>

                <!-- Location filter -->
                <select v-model="filterLocation" class="border rounded px-3 py-2 w-full lg:w-1/4">
                    <option value="all">---</option>
                    <option v-for="loc in Array.from(new Set(sensors.map(s => s.location)))" :key="loc" :value="loc">{{
                        loc }}</option>
                </select>

                <!-- Reset -->
                <button @click="resetFilters">
                    Reset
                </button>

            </div>
            <SensorTable :sensors="filteredSensors" :selected="selectedSensorId" @select="onSelectSensor" />
        </div>
        <div class="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-4">
            <SensorChart v-if="selectedSensor" :sensor="selectedSensor" />

            <div v-else class="text-gray-400 italic text-center w-full">
                Please select a sensor to view its measurements.
            </div>
        </div>
    </div>

</template>