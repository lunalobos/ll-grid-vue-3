[![npm](https://img.shields.io/npm/v/ll-grid-vue-3?logo=npm)](https://www.npmjs.com/package/ll-grid-vue-3)
![License](https://img.shields.io/github/license/lunalobos/ll-grid-vue-3)

![LL-Grid](https://ll-grid-vue-3.vercel.app/logo.webp)

# LL-Grid for Vue 3

LL-Grid is a powerful and flexible grid component for Vue 3, designed to handle datasets with ease. It provides a range of features including sorting, filtering, and pagination, making it ideal for applications that require efficient data management. The grid is built with performance in mind.  
**At the moment the component is in alpha stage and is not yet ready for production use.**

## Getting started

You will need to start by installing the package. You can do this by running the following command:

```sh
npm install ll-grid-vue-3
```

And you will need to add the css to your main.js file:

```js
import "ll-grid-vue-3/dist/ll-grid.css";
```

After that you can import the component in your Vue 3 application. You will need to import one of the grid components available. At the moment there are two: `GridDark` and `GridGreyMonochrome`.  
The `GridDark` component is a dark themed grid, while the `GridGreyMonochrome` component is a light themed grid.  
The following example shows how to import the `GridGreyMonochrome` component and use it in your application.  
You can use the `GridDark` component in the same way, just replace `GridGreyMonochrome` with `GridDark`.

```vue
<template>
  <GridEmerald :getter="() => table" class="inline-block" style="width: 1100px"/>
</template>

<script setup>
  import { GridEmerald, Table } from "ll-grid-vue-3";

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

For more details please refer to the [docs](https://ll-grid-vue-3.vercel.app/).