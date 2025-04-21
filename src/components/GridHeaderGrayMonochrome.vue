<template>
    <div class="grid grid-cols-12 p-1">
        <div class="relative inline-block col-span-1 p-1">
            <button v-if="header.type !== 'button'" @click="togleDropdown()"
                class="cursor-pointer bg-gray-400 p-2 hover:bg-gray-500 rounded-lg ">
                <component :is="filled ? FilledFilter : Filter"> </component>
            </button>

            <div v-show="showDropdown" class="block absolute bg-gray-100 shadow-lg min-w-42 z-10 rounded-lg p-2">
                <!-- the search input is a modified version of the first example from https://flowbite.com/docs/forms/search-input/ -->
                <form class="max-w-md mx-auto" @submit.prevent="() => { }">
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search"
                            class="block w-full p-2 ps-9 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                            required v-model="filterInput" />
                    </div>
                </form>
                <div class="border border-gray-300 overflow-y-auto max-h-48 rounded-lg p-1 bg-gray-50 mt-1">
                    <ul>
                        <li v-for="value in values"
                            :class="`${isSelected(value) ? 'li-element-selected' : 'li-element-regular'}`"
                            @click="togleValue(value)">
                            {{ value.formattedValue() }}
                        </li>
                    </ul>
                </div>
                <div v-show="selectedValues.length > 0" class="mt-1 flex justify-center items-center">
                    <button class="flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm "
                        @click="applyFilter()">
                        <Ok /><span class="ml-1 mr-1">Apply filter</span>
                    </button>
                </div>
                <div class="mt-1 flex justify-center items-center">
                    <button class="flex flex-row rounded-lg bg-gray-400 hover:bg-gray-500 cursor-pointer p-2 text-sm "
                        @click="cleanFilter()">
                        <Trash /><span class="ml-1 mr-1">Clear filter</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-center col-span-10 text-center p-2 ">
            <label class="cursor-pointer " @click="sort()">
                {{ header.title }}
            </label>
            <div class="p-1">
                <component :is="sortIcon" />
            </div>

        </div>
    </div>

</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Value } from '@/scripts/classes';
import { like, indexOf } from '@/scripts/util';
import CaretDown from './icons/CaretDown.vue';
import CaretUp from './icons/CaretUp.vue';
import Empty from './icons/Empty.vue';
import Filter from './icons/Filter.vue';
import FilledFilter from './icons/FilledFilter.vue';
import Trash from './icons/Trash.vue';
import Ok from './icons/Ok.vue';

const props = defineProps({
    getter: { type: Function, required: true },
    name: { type: String, required: true }
});

const header = computed(() => props.getter().getHeader(props.name));
const filterInput = ref('');
const values = computed(() => {
    if (filterInput.value && filterInput.value !== '') {
        return header.value.values.filteredValues(value => like(value, filterInput.value));
    } else {
        return header.value.values.values;
    }
});

const sortStatus = ref('none');

const sortIcon = computed(() => {
    switch (sortStatus.value) {
        case 'none':
            return Empty;
        case 'up':
            return CaretUp;
        case 'down':
            return CaretDown;
        default:
            throw new Error('Invalid sort status');
    }
})

const showDropdown = ref(false);

const selectedValues = ref([]);

const filled = ref(false);

/**
 * 
 * @param {Value} value 
 */
function isSelected(value) {
    return selectedValues.value.some(e => e.equals(value));
}

function sort() {
    if (header.value.type === 'button') {
        return;
    }
    switch (sortStatus.value) {
        case 'none':
            sortStatus.value = 'up';
            props.getter().sortByField(props.name, 'up');
            break;
        case 'up':
            sortStatus.value = 'down';
            props.getter().sortByField(props.name, 'down');
            break;
        case 'down':
            sortStatus.value = 'none';
            props.getter().sortByField(props.name, 'none');
            break;
        default:
            throw new Error('Invalid sort status');
    }
}

function togleDropdown() {
    showDropdown.value = !showDropdown.value;
}

/**
 * 
 * @param {Value} value 
 */
function togleValue(value) {
    const index = indexOf(selectedValues.value, value);
    if (index > -1) {
        selectedValues.value.splice(index, 1);
    } else {
        selectedValues.value.push(value);
    }

}

/**
 * 
 * @param {Value} value 
 */
function applyFilter() {
    props.getter().addFilter(props.name, selectedValues.value);
    filled.value = true;
    togleDropdown();
}

function cleanFilter() {
    props.getter().removeFilter(props.name);
    selectedValues.value = [];
    filled.value = false;
    togleDropdown();
}

watch(
    () => props.getter().change.filters,
    () => {
        props.getter().removeFilter(props.name);
        selectedValues.value = [];
        filled.value = false;
    }
);

</script>

<style scoped>
.li-element-regular {
    cursor: pointer;
    display: block;
    padding: calc(var(--spacing)*2);
    color: var(--color-black)
        /* #000 = #000000 */
    ;

    border-radius: var(--radius-lg)
        /* 0.5rem = 8px */
    ;
    font-size: var(--text-sm)
        /* 0.875rem = 14px */
    ;
    line-height: var(--tw-leading, var(--text-sm--line-height)
            /* calc(1.25 / 0.875) ≈ 1.4286 */
        );
    font-weight: var(--font-weight-normal)
        /* 400 */
    ;

    &:hover {
        @media (hover: hover) {
            background-color: var(--color-gray-200)
                /* oklch(92.8% 0.006 264.531) = #e5e7eb */
            ;
        }
    }
}

.li-element-selected {
    cursor: pointer;
    display: block;
    padding: calc(var(--spacing)*2);
    color: var(--color-white)
        /* #fff = #ffffff */
    ;
    background-color: var(--color-gray-400)
        /* oklch(70.7% 0.022 261.325) = #99a1af */
    ;

    border-radius: var(--radius-lg)
        /* 0.5rem = 8px */
    ;
    font-size: var(--text-sm)
        /* 0.875rem = 14px */
    ;
    line-height: var(--tw-leading, var(--text-sm--line-height)
            /* calc(1.25 / 0.875) ≈ 1.4286 */
        );
    font-weight: var(--font-weight-normal)
        /* 400 */
    ;

    &:hover {
        @media (hover: hover) {
            background-color: var(--color-gray-300)
                /* oklch(87.2% 0.01 258.338) = #d1d5dc */
            ;
        }
    }
}
</style>