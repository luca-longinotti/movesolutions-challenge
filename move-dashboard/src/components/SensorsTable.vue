<script setup>
defineProps({
  sensors: {
    type: Array,
    required: true
  }
});
</script>

<template>
    <table class="min-w-full border-collapse border border-gray-300">
        <thead class="bg-gray-100">
            <tr>
                <th class="border p-2 text-left">ID</th>
                <th class="border p-2 text-left">Name</th>
                <th class="border p-2 text-left">Location</th>
                <th class="border p-2 text-left">Last Value</th>
                <th class="border p-2 text-left">Status</th>
            </tr>
        </thead>
    
        <tbody class="6">
            <tr v-for="sensor in sensors" :key="sensor.id" class="hover:bg-gray-50">
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