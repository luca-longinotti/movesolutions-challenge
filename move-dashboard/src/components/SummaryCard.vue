<script setup>
import { toDisplayString } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    value: { type: [String, Number], default: '' }
});
</script>

<template>
    <div class="p-4 bg-white rounded-lg shadow-sm flex items-start gap-3 justify-between">
        <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <slot name="icon"></slot>
            </div>
            <div class="text-left">
                <div class="text-sm text-gray-500">{{ title }}</div>
                <div class="text-2xl font-semibold">{{ toDisplayString(value) }}</div>
            </div>
        </div>
        <div class="text-right text-sm text-gray-300"> <!-- reserved for small extra info (es: mm) -->
            <slot name="meta"></slot>
        </div>
    </div>
</template>