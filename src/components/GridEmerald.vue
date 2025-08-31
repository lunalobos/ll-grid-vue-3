<template>
    <div class=" rounded-xl">
        <div class="flex flex-row justify-center p-1 rounded-t-xl bg-emerald-400 ">
            <h3 v-show="getter().showTitle" class="text-lg font-medium text-white m-1">{{ title }}</h3>
        </div>
        <div class="grid" :style="`grid-template-columns: repeat(${widthInfo.total}, minmax(0, 1fr))`">
            <GridHeaderEmerald v-for="header in headers" :getter="props.getter" :name="header.name"
                class="bg-emerald-400 p-1 text-white text-lg font-medium" 
                :style="`grid-column: span ${widthInfo.widths[header.name]} / span ${widthInfo.widths[header.name]};`"/>
        </div>
        <div class="overflow-y-auto lg:max-h-[400px] md:max-h-[300px] sm:max-h-[200px]">
            <div v-for="(row, rowNum) in rows" class="grid"
                :style="`grid-template-columns: repeat(${widthInfo.total}, minmax(0, 1fr))`">
                <div v-for="cell in row.cells" class="p-1 bg-white"
                    :style="`grid-column: span ${widthInfo.widths[cell.key]} / span ${widthInfo.widths[cell.key]};`">
                    <div v-if="cell.buttonInfo" class="relative flex flex-row text-sm items-center justify-center">
                        <button class="flex flex-row p-2 cursor-pointer rounded-lg bg-emerald-400 hover:bg-emerald-500 text-white"
                            @click="applyEffect(cell.buttonInfo, row)">
                            <component :is="cell.buttonInfo.icon()"></component><span>{{ cell.buttonInfo.text }}</span>
                        </button>
                    </div>
                    <div v-else class="relative flex flex-row text-sm items-center justify-center">
                        <span class="inline-block align-middle p-2">{{ cell.value.formattedValue() }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-row justify-normal p-4 rounded-b-xl bg-white ">
            <button
                class="flex flex-row rounded-lg bg-emerald-400 hover:bg-emerald-500 cursor-pointer text-white p-1 px-2 mr-2"
                @click="() => props.getter().removeAllFilters()">
                <Trash /><span class="ml-1">Remove filters</span>
            </button>
            <label class="p-1 mr-1 font-medium text-gray-800">
                Rows per page:
            </label>
            <select class="bg-white rounded-lg p-1 mr-2" @change="(event) => props.getter().setPageSize(event.target.value)">
                <option v-for="size of pagination" class="rounded-lg bg-gray-100">{{ size }}</option>
            </select>
            <button class="rounded-lg hover:bg-emerald-300 cursor-pointer p-1" @click="() => props.getter().firstPage()">
                <ChevronDoubleLeft />
            </button>
            <button class="rounded-lg hover:bg-emerald-300 cursor-pointer p-1"
                @click="() => props.getter().previousPage()">
                <ChevronLeft />
            </button>
            <label class="p-1 font-medium text-gray-800">
                {{ pagesLabelContent }}
            </label>
            <button class="rounded-lg hover:bg-emerald-300 cursor-pointer p-1" @click="() => props.getter().nextPage()">
                <ChevronRight />
            </button>
            <button class="rounded-lg hover:bg-emerald-300 cursor-pointer p-1" @click="() => props.getter().lastPage()">
                <ChevronDoubleRight />
            </button>
        </div>
    </div>

</template>

<script setup>
import { watch, ref } from 'vue';
import ChevronDoubleRight from './icons/ChevronDoubleRight.vue';
import ChevronRight from './icons/ChevronRight.vue';
import ChevronLeft from './icons/ChevronLeft.vue';
import ChevronDoubleLeft from './icons/ChevronDoubleLeft.vue';
import Trash from './icons/Trash.vue';
import GridHeaderEmerald from './GridHeaderEmerald.vue';

const props = defineProps({
    getter: { type: Function, required: true }
});

const widthInfo = ref(props.getter().widthInfo);

const rows = ref(props.getter().visibleRows());

const title = ref(props.getter().title());

const headers = ref(props.getter().headers);

const pagesLabelContent = ref(`Page ${props.getter().currentPage()} of ${props.getter().pages}`);

const pagination = ref(props.getter().pagination);

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

function applyEffect(buttonInfo, row) {
    return buttonInfo.effect(row.toModel());
}
</script>
