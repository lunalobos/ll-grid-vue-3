<template>
    <div class="border border-gray-600 rounded-xl">
        <div class="flex flex-row justify-center p-4 rounded-t-xl bg-gray-800 ">
            <h3 class="text-lg font-medium text-gray-200">{{ title }}</h3>
        </div>
        <div class="grid" :style="`grid-template-columns: repeat(${widthInfo.total}, minmax(0, 1fr))`">
            <GridHeaderDark v-for="header in headers" :getter="props.getter" :name="header.name"
                class="bg-gray-600 p-1 text-white text-lg font-medium" 
                :style="`grid-column: span ${widthInfo.widths[header.name]} / span ${widthInfo.widths[header.name]};`"/>
        </div>
        <div class="overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]">
            <div v-for="(row, rowNum) in rows" class="grid"
                :style="`grid-template-columns: repeat(${widthInfo.total}, minmax(0, 1fr))`">
                <div v-for="cell in row.cells" class="p-1"
                    :style="`background-color: ${isOdd(rowNum) ? 'oklch(37.3% 0.034 259.733)' : 'oklch(21% 0.034 264.665)'}; grid-column: span ${widthInfo.widths[cell.key]} / span ${widthInfo.widths[cell.key]};`">
                    <div v-if="cell.buttonInfo" class="relative flex flex-row text-sm items-center justify-center">
                        <button class="flex flex-row p-2 cursor-pointer rounded-lg bg-gray-600 hover:bg-gray-500 text-white"
                            @click="applyEffect(cell.buttonInfo, row)">
                            <component :is="cell.buttonInfo.icon()"></component><span>{{ cell.buttonInfo.text }}</span>
                        </button>
                    </div>
                    <div v-else class="relative flex flex-row text-sm items-center justify-center text-white">
                        <span class="inline-block align-middle p-2">{{ cell.value.formattedValue() }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row justify-end p-4 rounded-b-xl bg-gray-800 ">
            <button
                class="flex flex-row rounded-lg bg-gray-600 hover:bg-gray-500 cursor-pointer text-gray-50 p-1 px-2 mr-2"
                @click="() => props.getter().removeAllFilters()">
                <Trash /><span class="ml-1">Remove filters</span>
            </button>
            <label class="p-1 mr-1 font-medium text-gray-200">
                Rows per page:
            </label>
            <select v-model="pageSize" class="bg-gray-900 rounded-lg p-1 mr-2 text-gray-50">
                <option v-for="size of pagination" class="bg-gray-900">{{ size }}</option>
            </select>
            <button class="rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50" @click="() => props.getter().firstPage()">
                <ChevronDoubleLeft />
            </button>
            <button class="rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50"
                @click="() => props.getter().previousPage()">
                <ChevronLeft />
            </button>
            <label class="p-1 font-medium text-gray-200">
                {{ pagesLabelContent }}
            </label>
            <button class="rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50" @click="() => props.getter().nextPage()">
                <ChevronRight />
            </button>
            <button class="rounded-lg hover:bg-gray-700 cursor-pointer p-1 text-gray-50" @click="() => props.getter().lastPage()">
                <ChevronDoubleRight />
            </button>
        </div>
    </div>

</template>

<script setup>
import GridHeaderDark from './GridHeaderDark.vue';
import { watch, ref } from 'vue';
import ChevronDoubleRight from './icons/ChevronDoubleRight.vue';
import ChevronRight from './icons/ChevronRight.vue';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronDoubleLeft from './icons/ChevronDoubleLeft.vue';
import Trash from './icons/Trash.vue';

const props = defineProps({
    getter: { type: Function, required: true }
});

const widthInfo = ref(props.getter().widthInfo);

const rows = ref(props.getter().visibleRows());

const title = ref(props.getter().title());

const headers = ref(props.getter().headers);

const pagesLabelContent = ref(`Page ${props.getter().currentPage()} of ${props.getter().pages}`);

const pagination = ref(props.getter().pagination);

const pageSize = ref(props.getter().pageSize);

function isOdd(index) {
    return index % 2 === 0;
}

watch(
    () => props.getter().change.content,
    () => {
        rows.value = props.getter().visibleRows();
        widthInfo.value = props.getter().widthInfo;
        title.value = props.getter().title();
        headers.value = props.getter().headers;
        pagesLabelContent.value = `Page ${props.getter().currentPage()} of ${props.getter().pages}`;
        pagination.value = props.getter().pagination;
    }
);

watch(
    pageSize,
    () => {
        props.getter().setPageSize(pageSize.value);
    }
);

function applyEffect(buttonInfo, row) {
    return buttonInfo.effect(row.toModel());
}
</script>
