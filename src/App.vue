<template>
  <div class="flex  justify-center">
    <div class="lg:w-2/3 md:w-5/6 sm:w-full p-4">
      <div class="flex flex-row justify-center">
        <div class="p-2">
          <Rocket class="h-5 w-5" />
        </div>
        <div class="p-1 ">
          <h1 class="text-2xl font-bold mb-4">LL-Grid for Vue 3</h1>
        </div>

      </div>
      <div class="p-1 ">
        <h2 class="text-xl font-bold mb-4">Overview</h2>
      </div>
      <p class="mb-4">
        LL-Grid is a powerful and flexible grid component for Vue 3, designed to handle datasets with ease. It
        provides a range of features including sorting, filtering, and pagination, making it ideal for applications that
        require efficient data management. The grid is built with performance in mind. At the moment the component is in
        alpha stage and is not yet ready for production use.
      </p>
      <div class="p-1 ">
        <h2 class="text-xl font-bold mb-4">Getting started</h2>
      </div>
      <p class="mb-4">
        You wil need to start by installing the package. You can do this by running the following command:
      </p>
      <pre class="bg-gray-800 p-4 rounded-lg text-sm text-green-200 overflow-auto">
<code>$ npm install ll-grid</code></pre>
      <p class="mt-1 mb-4">
        After that you can import the component in your Vue 3 application. You will need to import the one of the
        grid components available. At the moment there are two : <code>GridDark</code> and
        <code>GridGreyMonochrome</code>. The
        <code>GridDark</code> component is a dark themed grid, while the <code>GridGreyMonochrome</code> component is a
        light
        themed grid. The following example shows how to import the <code>GridGreyMonochrome</code> component and use it
        in
        your
        application. You can use the <code>GridDark</code> component in the same way, just replace
        <code>GridGreyMonochrome</code> with <code>GridDark</code>.
      </p>


      <pre class="bg-gray-800 p-4 rounded-lg text-sm  text-green-200 overflow-auto">
    <code>&lt;template&gt;
      &lt;GridGreyMonochrome :getter="getter" /&gt;
    &lt;/template&gt;

        &lt;script setup&gt;
        import { Table } from 'll-grid';
        import GridGreyMonochrome from 'll-grid';
        import { exampleModels, exampleTypes } from './scripts/example';

        const exampleModels = [
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Smith', age: 25 },
          { id: 3, name: 'Alice Johnson', age: 35 },
        ];

        const exampleTypes = ['number', 'text', 'number'];

        const table = new Table('My Table', exampleModels, exampleTypes, [5, 10, 20]);
        const getter = () => table;
        &lt;/script&gt;</code></pre>
      <p class="mt-2 mb-4">
        This how a GridGreyMonochrome component looks like:
      </p>
      <div class="flex flex-row rounded-lg p-4 mb-6 justify-center items-center">
        <GridGreyMonochrome :getter="getter" class="inline-block" style="width: 600px" />
      </div>
      <p class="mb-4">
        The <code>getter</code> function is a function that returns the table object. This is used to avoid
        create a big reactive object. The <code>table</code> object is an instance of the
        <code>Table</code> class, which is defined in the script <code>classes.js</code> file. The
        <code>exampleModels</code> and <code>exampleTypes</code> are just example data that is used
        to populate the table.
      </p>
      <p class="mb-4">
        The table object can listen to changes in the data as long you pass the new content through the
        setContent method. The table object has an inner reactive trigger that it is been used as shared
        state by the Grid component. So the grid will be updated if you use the setContent method, otherwise
        reactivity will not work.
      </p>
      <pre>
      <code>
        const newContent = [
          { id: 1, name: 'John Doe', age: 30 },
          { id: 2, name: 'Jane Smith', age: 25 },
          { id: 3, name: 'Alice Johnson', age: 35 },
        ];
        // Set the new content for the table and specify the types of the columns
        // This wil update the grid
        table.setContent(table.name, newContent, ['number', 'text', 'number']);
      </code>
    </pre>



    </div>
  </div>
</template>

<script setup>
import GridGreyMonochrome from '@/components/GridGreyMonochrome.vue';
import { Table } from '@/scripts/classes';

import Rocket from './components/icons/Rocket.vue';

const exampleModels = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
  { id: 3, name: 'Alice Johnson', age: 35 },
];

const exampleTypes = ['number', 'text', 'number'];
const table = new Table('My Table', exampleModels, exampleTypes, [5, 10, 20]);
const getter = () => table;
</script>
