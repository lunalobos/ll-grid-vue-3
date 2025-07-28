![npm](https://img.shields.io/npm/v/ll-grid-vue-3?logo=npm)
![License](https://img.shields.io/github/license/lunalobos/ll-grid-vue-3)

![LL-Grid](https://media.canva.com/v2/image-resize/format:PNG/height:577/quality:100/uri:ifs%3A%2F%2FM%2F69dad9c4-d678-4d8c-9385-283389ffb108/watermark:F/width:921?csig=AAAAAAAAAAAAAAAAAAAAAFQMqkR3ZJEelnUhgh1uIBg9Jxx6vCWZF6_tYvGSfTs6&exp=1753748750&osig=AAAAAAAAAAAAAAAAAAAAANm_zzyQL1UH9JjjtDU6dTdecJ9quDSEa8WXO6Zn8Z_2&signer=media-rpc&x-canva-quality=screen_2x)

# LL-Grid for Vue 3

LL-Grid is a powerful and flexible grid component for Vue 3, designed to handle datasets with ease. It provides a range of features including sorting, filtering, and pagination, making it ideal for applications that require efficient data management. The grid is built with performance in mind.  
**At the moment the component is in alpha stage and is not yet ready for production use.**

## Getting started

You will need to start by installing the package. You can do this by running the following command:

```sh
npm install ll-grid-vue-3
```

After that you can import the component in your Vue 3 application. You will need to import one of the grid components available. At the moment there are two: `GridDark` and `GridGreyMonochrome`.  
The `GridDark` component is a dark themed grid, while the `GridGreyMonochrome` component is a light themed grid.  
The following example shows how to import the `GridGreyMonochrome` component and use it in your application.  
You can use the `GridDark` component in the same way, just replace `GridGreyMonochrome` with `GridDark`.

```vue
<template>
  <GridGreyMonochrome :getter="() => table" class="inline-block" style="width: 1100px"/>
</template>

<script setup>
  import { Table } from "ll-grid-vue-3";
  import GridGreyMonochrome from "ll-grid-vue-3";

  const exampleModels = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      country: "USA",
      status: "Active",
      registered: new Date(2022, 1, 15),
      rating: 1.891,
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 25,
      email: "jane@example.com",
      country: "Canada",
      status: "Inactive",
      registered: new Date(2022, 11, 22),
      rating: 1.423,
    },
    // ...more rows...
  ];

  const exampleTypes = {
    id: "number",
    name: "text",
    age: "number",
    email: "text",
    country: "text",
    status: "text",
    registered: "dateTime",
    rating: "number",
  };

  const exampleFormats = {
    registered: "en-US",
    rating: "%.2",
  };

  const options = {
    types: exampleTypes,
    pagination: [5, 10, 20],
    formats: exampleFormats,
    showTitle: false,
    showFilters: true,
  };

  const table = new Table("My Table", exampleModels, options);
</script>
```

---

## Example: GridGreyMonochrome

This is how a `GridGreyMonochrome` component looks like:

```vue
<GridGreyMonochrome :getter="() => tableGray" class="inline-block" style="width: 1100px"/>
```
![GridGreyMonochrome](https://media.canva.com/v2/image-resize/format:JPG/height:394/quality:92/uri:ifs%3A%2F%2FM%2F91d16249-1ef1-4025-a23a-09a3dcc64542/watermark:F/width:1202?csig=AAAAAAAAAAAAAAAAAAAAACDpuwuTWEyBlKynYxfr4SV3e88K9gySj28jMHLTSUuU&exp=1753746914&osig=AAAAAAAAAAAAAAAAAAAAAC5lG-ZyNu_PPZ3HOwgldZ6JQk18e6-cu7YradEF0H2Y&signer=media-rpc&x-canva-quality=screen_2x)

## Example: GridDark

And this is how a `GridDark` component looks like:

```vue
<GridDark :getter="() => tableDark" class="inline-block" style="width: 1100px"/>
```

![GridDark](https://media.canva.com/v2/image-resize/format:JPG/height:394/quality:92/uri:ifs%3A%2F%2FM%2F854323cc-cd68-4210-8375-3e12e4b78879/watermark:F/width:1202?csig=AAAAAAAAAAAAAAAAAAAAAFrhPKwat-FndXf2x-ZTQnyQ7IKporlvKc-E7oVhwSUW&exp=1753746894&osig=AAAAAAAAAAAAAAAAAAAAAA7eQ3NVnIMg-rylfrYi1hRpn0NdPPDWCC3lUx79HSgE&signer=media-rpc&x-canva-quality=screen_2x)


---

## Notes

- The `getter` function is a function that returns the table object. This is used to avoid creating a big reactive object.
- The `table` object is an instance of the `Table` class.
- The `exampleModels` and `exampleTypes` are just example data that is used to populate the table.

The table object can listen to changes in the data as long as you pass the new content through the `setContent` method.  
The table object has an inner reactive trigger that is used as shared state by the Grid component.  
So the grid will be updated if you use the `setContent` method, otherwise reactivity will not work.

```js
const newContent = [
  // ...
];

// Set the new content for the table and specify the types of the columns
// This will update the grid
table.setContent(table.name, newContent);
```

