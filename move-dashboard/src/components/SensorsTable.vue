<script setup>
import { ref,computed } from 'vue';

const props = defineProps({
  sensors: {
    type: Array,
    required: true
  }
});

const sortAsc = ref(true);

function sortByName() {
    sortAsc.value = !sortAsc.value;
}

const sortedSensors = computed(() => {
    return [...props.sensors].sort((a, b) => {
        if (sortAsc.value) {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
});

</script>

<template>
    <table class="min-w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
            <tr>
                <th class="border p-2">ID</th>
                <th @click="sortByName" class="border p-2">
                    Name
                    <span v-if="sortAsc">▲</span>
                    <span v-else>▼</span>
                </th>
                <th class="border p-2">Location</th>
                <th class="border p-2">Last Value</th>
                <th class="border p-2">Status</th>
            </tr>
        </thead>
    
        <tbody class="6">
            <tr v-for="sensor in sortedSensors" :key="sensor.id" class="hover:bg-gray-50">
                <td class="border p-2">{{ sensor.id }}</td>
                <td class="border p-2">{{ sensor.name }}</td>
                <td class="border p-2">{{ sensor.location }}</td>
                <td class="border p-2">{{ sensor.lastValue.toFixed(2) }} mm</td>
                <td class="border p-2">
                    <span 
                        :class="{
                            'text-green-600 font-semibold': sensor.status === 'OK',
                            'text-red-600 font-semibold': sensor.status === 'Alarm'
                        }"
                    >
                        {{ sensor.status }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>