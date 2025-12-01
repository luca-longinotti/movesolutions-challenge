<script setup>
import { ref,computed } from 'vue';

const emit = defineEmits(['select']);

const props = defineProps({
  sensors: {
    type: Array,
    required: true
  },
  selected: {
    type: String,
    default: null
  }
});

const sortKey = ref("status");
const sortAsc = ref(true);

/*
function sortByName() {
   sortAsc.value = !sortAsc.value;
}
*/

function sortIcon(key) {
    if(key !== sortKey.value) return '';
    return sortAsc.value ? '▲' : '▼';
}

function sortBy(key) {
    if(key === sortKey.value) {
        sortAsc.value = !sortAsc.value; //same coloumn
    } else {
        sortKey.value = key;            //new coloumn
        sortAsc.value = true;
    }
}

const sortedSensors = computed(() => {
    return [...props.sensors].sort((a, b) => {

        let valA = a[sortKey.value];
        let valB = b[sortKey.value];

        //string normalizaion
        if(typeof valA === 'string') valA = valA.toLowerCase();
        if(typeof valB === 'string') valB = valB.toLowerCase();

        if(valA < valB) return sortAsc.value ? -1 : 1;
        if(valA > valB) return sortAsc.value ? 1 : -1;
        return 0;
    });
});

</script>

<template>
    <table class="min-w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
            <tr>
                <th @click="sortBy('id')" class="border p-2 cursor-pointer">
                    ID
                    <span class="">{{ sortIcon('id') }}</span>
                </th>
                <th @click="sortBy('name')" class="border p-2 cursor-pointer">
                    Name
                    <span class="ml-1">{{ sortIcon('name') }}</span>
                </th>
                <th @click="sortBy('location')" class="border p-2 cursor-pointer">
                    Location
                    <span class="ml-1">{{ sortIcon('location') }}</span>
                </th>
                <th @click="sortBy('lastValue')" class="border p-2 cursor-pointer">
                    Last Value
                    <span class="ml-1">{{ sortIcon('lastValue') }}</span>
                </th>
                <th @click="sortBy('status')" class="border p-2 cursor-pointer">
                    Status
                    <span class="ml-1">{{ sortIcon('status') }}</span>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="sensor in sortedSensors" :key="sensor.id" @click="emit('select', sensor)" :class="[
                sensor.id === selected ? 'bg-blue-100 border-3 border-blue-600 font-semibold shadow-inner' : 'hover:bg-gray-100 cursor-pointer transition'
            ]">
                <td class="border p-2">{{ sensor.id }}</td>
                <td class="border p-2">{{ sensor.name }}</td>
                <td class="border p-2">{{ sensor.location }}</td>
                <td class="border p-2">{{ sensor.lastValue.toFixed(2) }} mm</td>
                <td class="border p-2">
                    <span :class="{
                        'text-green-600 font-semibold': sensor.status === 'OK',
                        'text-red-600 font-semibold': sensor.status === 'Alarm'
                    }">
                        {{ sensor.status }}
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>