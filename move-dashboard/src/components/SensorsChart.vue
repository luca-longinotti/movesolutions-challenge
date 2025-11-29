<script setup>

import {computed, onMounted, watch, ref} from 'vue';
import Plotly from 'plotly.js-dist-min';

const props = defineProps({
    sensor: {
        type: Object,
        required: true
    }
});

const chartRef = ref(null);

// Prepare data for charting
const timestamps = computed(() => 
    props.sensor.measurements.map(m => m.timestamp)
);

const values = computed(() => 
    props.sensor.measurements.map(m => m.disp_mm)
);

// Render chart when component is mounted or data changes
function renderChart() {
    const data = [
        {
            x: timestamps.value,
            y: values.value,
            type: 'scatter',
            mode: 'lines+markers',
            name: props.sensor.id
        },
        {
            x: [timestamps.value[0], timestamps.value.at(-1)],
            y: [props.sensor.threshold, props.sensor.threshold],
            type: "scatter",
            mode: "lines",
            name: "Threshold",
            line: { dash: "dash", width: 2 }
        }
    ];

    const layout = {
        title: `Sensor ${props.sensor.name} Measurements`,
        margin: { t: 30, l: 40, r: 10, b: 30 },
        xaxis: { title: 'Time' },
        yaxis: { title: 'Displacement (mm)' },
        showlegend: true
    };

    Plotly.newPlot(chartRef.value, data, layout, {responsive: true});
}

onMounted(renderChart);

// Re-render chart when sensor change
watch(
    () => props.sensor, renderChart, { deep: true }
);

</script>




<template>
    <div class="border p-4 rounded-md w-full">
        <h2 class="text-lg font-semibold mb-2">
            {{ sensor.name }} — Trend last 3 days
        </h2>

    <div ref="chartRef" class="w-full h-80"></div>
    </div>
</template>