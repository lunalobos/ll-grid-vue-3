<template>
    <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-lg max-w-1/3 min-w-1/5">
            <!-- Modal Header -->
            <div class="flex flex-row items-center  p-4 justify-center">
                <h2 class="text-lg font-semibold">{{ title }}</h2>
            </div>
            <!-- Modal Content -->
            <div class="flex flex-row items-center justify-center p-4">
                <slot></slot>
            </div>
            <!-- Modal Footer -->
            <div class="flex flex-row justify-center p-4">
                <button @click="closeModal()" class="cursor-pointer bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: { type: String, required: true },
    visible: { type: Object, required: true }
});

const isVisible = computed(() => props.visible.modal);

function closeModal() {
    props.visible.modal = false;
}

</script>