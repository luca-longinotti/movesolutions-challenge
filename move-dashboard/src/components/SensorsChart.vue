<script setup>

import { computed, onMounted, watch, ref } from 'vue';
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

    const aboveThreshold = props.sensor.measurements.filter(
        m => m.disp_mm > props.sensor.threshold);

    const maxValue = Math.max(...values.value);
    const maxPoint = props.sensor.measurements.find(m => m.disp_mm === maxValue);

    const data = [
        {
            x: timestamps.value,
            y: values.value,
            type: 'scatter',
            mode: 'lines+markers',
            line: { shape: 'spline', smoothing: 1.3 },
            name: props.sensor.id,
            hovertemplate: "%{y} mm<br>%{x}<extra></extra>"
        },
        {
            x: aboveThreshold.map(m => m.timestamp),
            y: aboveThreshold.map(m => m.disp_mm),
            mode: 'markers',
            name: "Alarm values",
            marker: { color: '#dc2626' }, //red
            hovertemplate: "%{y} mm<br>%{x}<extra></extra>"
        },
        {
            x: [timestamps.value[0], timestamps.value.at(-1)],
            y: [props.sensor.threshold, props.sensor.threshold],
            type: "scatter",
            mode: "lines",
            name: "Threshold",
            line: { dash: "dash", width: 2 },
            hovertemplate: "%{y} mm<br>%{x}<extra></extra>"
        },
        {
            x: [maxPoint.timestamp],
            y: [maxPoint.disp_mm],
            mode: "markers+text",
            name: "Max",
            marker: { color: "#ffff00", size: 12 },
            textposition: "top center",
            hovertemplate: "%{y} mm<br>%{x}<extra></extra>"
        }
    ];

    const layout = {
        title: `Sensor ${props.sensor.name} Measurements`,
        margin: { t: 40, l: 30, r: 30, b: 50 },
        legend: { orientation: "h", y: -0.2, xanchor: "center", x: 0.5 },
        xaxis: { title: 'Time' },
        yaxis: { title: 'Displacement (mm)' },
        showlegend: true
    };

    Plotly.newPlot(chartRef.value, data, layout, { responsive: true, displaylogo: false, modeBarButtonsToRemove: ["lasso2d", "select2d"] });
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