<script setup>

import {computed} from 'vue';

const props = defineProps({
    sensor: {
        type: Object,
        required: true
    }
});


// Prepare data for charting
const timestamps = computed(() => {
    return props.sensor.measurements.map(m => m.timestamp);
});

const values = computed(() => {
    return props.sensor.measurements.map(m => m.disp_mm);
});

</script>




<template>
    <div class="border p-4 rounded-md w-full">
        <h2 class="text-lg font-semibold mb-2">
            {{ sensor.name }} — Measurements
        </h2>

    <p class="text-gray-500">Grafico</p>
    </div>
</template>