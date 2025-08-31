<template>
	<div class="flex justify-center">
		<div class="lg:w-2/3 md:w-5/6 sm:w-full p-4">
			<div class="flex flex-row justify-center">
				<div class="p-2">
					<Rocket class="h-5 w-5" />
				</div>
				<div class="p-1">
					<h1 class="text-2xl font-bold mb-4">LL-Grid for Vue 3</h1>
				</div>
			</div>
			<div class="p-1">
				<h2 class="text-xl font-bold mb-4">Overview</h2>
			</div>
			<p class="mb-4">
				LL-Grid is a powerful and flexible grid component for Vue 3, designed to
				handle datasets with ease. It provides a range of features including
				sorting, filtering, and pagination, making it ideal for applications
				that require efficient data management. The grid is built with
				performance in mind. At the moment the component is in alpha stage and
				is not yet ready for production use.
			</p>
			<div class="p-1">
				<h2 class="text-xl font-bold mb-4">Getting started</h2>
			</div>
			<p class="mb-2">
				You wil need to start by installing the package. You can do this by
				running the following command:
			</p>
			<pre
				class="bg-gray-800 p-4 rounded-lg text-sm text-green-200 overflow-auto"
			>
<code>$ npm install ll-grid-vue-3</code></pre>
			<p class="mt-2 mb-2">
				And you will need to add the css to your main.js file:
			</p>
			<pre class="bg-gray-800 p-4 rounded-lg text-sm text-white overflow-auto">
<code><span class="text-fuchsia-300">import</span> <span class="text-orange-300">"ll-grid-vue-3/dist/ll-grid.css";</span></code></pre>
			<p class="mt-1 mb-4">
				After that you can import the component in your Vue 3 application. You
				will need to import the one of the grid components available. At the
				moment there are two: <code>GridDark</code> and
				<code>GridGreyMonochrome</code>. The <code>GridDark</code> component is
				a dark themed grid, while the <code>GridGreyMonochrome</code> component
				is a light themed grid. The following example shows how to import the
				<code>GridGreyMonochrome</code> component and use it in your
				application. You can use the <code>GridDark</code> component in the same
				way, just replace <code>GridGreyMonochrome</code> with
				<code>GridDark</code>.
			</p>

			<pre class="bg-gray-800 p-4 rounded-lg text-sm text-white overflow-auto">
<code><span class="text-gray-400">&lt;</span><span class="text-sky-500">template</span><span class="text-gray-400">&gt;</span>
  <span class="text-gray-400">&lt;</span><span class="text-emerald-400">GridEmerald</span> <span class="text-white">:</span><span class="text-cyan-200">getter</span><span class="text-white">="</span><span class="text-yellow-200">()</span> <span class="text-sky-300">=></span><span class="text-cyan-200"> table</span><span class="text-white">"</span> <span class="text-cyan-200">class</span>=<span class="text-orange-300">"inline-block"</span> <span class="text-cyan-200">style</span>=<span class="text-orange-300">"width: 1100px"</span><span class="text-gray-400">/&gt;</span>
<span class="text-gray-400">&lt;/</span><span class="text-sky-500">template</span><span class="text-gray-400">&gt;</span>

<span class="text-gray-400">&lt;</span><span class="text-sky-500">script</span> <span class="text-cyan-200">setup</span><span class="text-gray-400">&gt;</span>
  <span class="text-fuchsia-300">import</span> { <span class="text-cyan-200">GridGreyMonochrome, Table</span> } <span class="text-fuchsia-300">from</span> <span class="text-orange-300">"ll-grid-vue-3"</span>;
  <span class="text-fuchsia-300">import</span> { <span class="text-cyan-200">exampleModels, exampleTypes</span> } <span class="text-fuchsia-300">from</span> <span class="text-orange-300">"./scripts/example"</span>;

  <span class="text-sky-500">const</span> <span class="text-sky-300">exampleModels</span> = [
    {
      <span class="text-cyan-200">id</span>: <span class="text-green-200">1</span>,
      <span class="text-cyan-200">name</span>: <span class="text-orange-300">"John Doe"</span>,
      <span class="text-cyan-200">age</span>: <span class="text-green-200">30</span>,
      <span class="text-cyan-200">email</span>: <span class="text-orange-300">"john@example.com"</span>,
      <span class="text-cyan-200">country</span>: <span class="text-orange-300">"USA"</span>,
      <span class="text-cyan-200">status</span>: <span class="text-orange-300">"Active"</span>,
      <span class="text-cyan-200">registered</span>: <span class="text-sky-500">new</span> <span class="text-emerald-400">Date</span>(<span class="text-green-200">2022</span>, <span class="text-green-200">1</span>, <span class="text-green-200">15</span>),
      <span class="text-cyan-200">rating</span>: <span class="text-green-200">1.891</span>,
    },
    {
      <span class="text-cyan-200">id</span>: <span class="text-green-200">2</span>,
      <span class="text-cyan-200">name</span>: <span class="text-orange-300">"Jane Smith"</span>,
      <span class="text-cyan-200">age</span>: <span class="text-green-200">25</span>,
      <span class="text-cyan-200">email</span>: <span class="text-orange-300">"jane@example.com"</span>,
      <span class="text-cyan-200">country</span>: <span class="text-orange-300">"Canada"</span>,
      <span class="text-cyan-200">status</span>: <span class="text-orange-300">"Inactive"</span>,
      <span class="text-cyan-200">registered</span>: <span class="text-sky-500">new</span> <span class="text-emerald-400">Date</span>(<span class="text-green-200">2022</span>, <span class="text-green-200">11</span>, <span class="text-green-200">22</span>),
      <span class="text-cyan-200">rating</span>: <span class="text-green-200">1.423</span>,
    },
    <span class="text-green-200">// ...more rows...</span>
  ];

  <span class="text-sky-500">const</span> <span class="text-sky-300">exampleTypes</span> = {
    <span class="text-cyan-200">id</span>: <span class="text-orange-300">"number"</span>,
    <span class="text-cyan-200">name</span>: <span class="text-orange-300">"text"</span>,
    <span class="text-cyan-200">age</span>: <span class="text-orange-300">"number"</span>,
    <span class="text-cyan-200">email</span>: <span class="text-orange-300">"text"</span>,
    <span class="text-cyan-200">country</span>: <span class="text-orange-300">"text"</span>,
    <span class="text-cyan-200">status</span>: <span class="text-orange-300">"text"</span>,
    <span class="text-cyan-200">registered</span>: <span class="text-orange-300">"dateTime"</span>,
    <span class="text-cyan-200">rating</span>: <span class="text-orange-300">"number"</span>,
  };

  <span class="text-sky-500">const</span> <span class="text-sky-300">exampleFormats</span> = {
    <span class="text-cyan-200">registered</span>: <span class="text-orange-300">"en-US"</span>,
    <span class="text-cyan-200">rating</span>: <span class="text-orange-300">"%.2"</span>,
  };

  <span class="text-sky-500">const</span> <span class="text-sky-300">options</span> = {
    <span class="text-cyan-200">types</span>: <span class="text-sky-300">exampleTypes</span>,
    <span class="text-cyan-200">pagination</span>: [<span class="text-green-200">5, 10, 20</span>],
    <span class="text-cyan-200">formats</span>: <span class="text-sky-300">exampleFormats</span>,
    <span class="text-cyan-200">showTitle</span>: <span class="text-sky-500">false</span>,
    <span class="text-cyan-200">showFilters</span>: <span class="text-sky-500">true</span>,
  };

  <span class="text-sky-500">const</span> <span class="text-sky-300">table</span> = <span class="text-sky-500">new</span> <span class="text-emerald-400">Table</span>(<span class="text-orange-300">"My Table"</span>, <span class="text-sky-300">exampleModels</span>, <span class="text-sky-300">options</span>);
<span class="text-gray-400">&lt;/<span class="text-sky-500">script</span>&gt;</span></code></pre>
			<p class="mt-2 mb-4">Here are some example for different themes:</p>
			<h3 class="mt-2 mb-4 text-lg text-center font-medium">GridEmerald</h3>
			<div
				class="flex flex-row rounded-lg p-4 mb-6 justify-center items-center"
			>
				<GridEmerald
					:getter="() => tableEmerald"
					class="inline-block"
					style="width: 1100px"
				/>
			</div>
			<h3 class="mt-2 mb-4 text-lg text-center font-medium">
				GridGreyMonochrome
			</h3>
			<div
				class="flex flex-row rounded-lg p-4 mb-6 justify-center items-center"
			>
				<GridGreyMonochrome
					:getter="() => tableGray"
					class="inline-block"
					style="width: 1100px"
				/>
			</div>
			<h3 class="mt-2 mb-4 text-lg text-center font-medium">GridDark</h3>
			<div
				class="flex flex-row rounded-lg p-4 mb-6 justify-center items-center"
			>
				<GridDark
					:getter="() => tableDark"
					class="inline-block"
					style="width: 1100px"
				/>
			</div>
			<h2 class="text-xl font-bold mb-4">Considerations on reactivity</h2>
			<p class="mb-4">
				The <code>getter</code> function is a function that returns the table
				object. This is used to avoid create a big reactive object. The
				<code>table</code> object is an instance of the
				<code>Table</code> class. The <code>exampleModels</code> and
				<code>exampleTypes</code> are just example data that is used to populate
				the table.
			</p>
			<p class="mb-4">
				The table object can listen to changes in the data as long you pass the
				new content through the setContent method. The table object has an inner
				reactive trigger that it is been used as shared state by the Grid
				component. So the grid will be updated if you use the setContent method,
				otherwise reactivity will not work.
			</p>
			<pre
				class="bg-gray-800 p-4 rounded-lg text-sm text-white overflow-auto mb-4"
			><code>  <span class="text-sky-500">const</span> <span class="text-sky-300">newContent</span> = [
    ...
  ];

  <span class="text-green-200">// Set the new content for the table and specify the types of the columns</span>
  <span class="text-green-200">// This wil update the grid</span>
  <span class="text-sky-300">table</span>.<span class="text-yellow-300">setContent</span>(<span class="text-sky-300">table</span>.<span class="text-cyan-200">name</span>, <span class="text-sky-300">newContent</span>);</code></pre>
			<h2 class="text-xl font-bold mb-4">Adding buttons</h2>
			<p class="mb-4">
				You can add buttons to the table by using the
				<code><span class="text-yellow-700">addButton</span></code> method of
				the table object. This wil create a new column with a button for each
				row.
			</p>
			<p class="mb-4">
				Buttons has a predetermined style and you can pass an svg icon wrapped as a
				vue component. Also you will need to pass the function that will be
				executed when the button is clicked, the button text, and the column
				name.
			</p>
			<p class="mb-4">
				Be aware that the function will receive the model of the row as an
				argument. This is convenient, for example, if you want to open a modal
				with current row's data.
			</p>
			<pre
				class="bg-gray-800 p-4 rounded-lg text-sm text-white overflow-auto mb-4"
			>
<code>
<span class="text-fuchsia-300">import</span> { <span class="text-cyan-200">Table</span> } <span class="text-fuchsia-300">from</span> <span class="text-orange-300">"ll-grid-vue-3"</span>;
<span class="text-fuchsia-300">import</span> OpenModal <span class="text-fuchsia-300">from</span> <span class="text-orange-300">"@/components/icons/Rocket.vue"</span>;

<span class="text-green-200">// some code for obtaining table's data and configuration</span>

<span class="text-sky-500">const</span> <span class="text-sky-300">table</span> = <span class="text-sky-500">new</span> <span class="text-emerald-400">Table</span>(<span class="text-orange-300">"My Table"</span>, <span class="text-sky-300">exampleModels</span>, <span class="text-sky-300">options</span>);

<span class="text-green-200">// add a button</span>
<span class="text-sky-300">table</span>.<span class="text-yellow-300">addButton</span>(
  OpenModal, 
  (<span class="text-sky-300">model</span>) => {
    alert(<span class="text-orange-300">`Clicked row: ${JSON.stringify(model)}`</span>);
  }, 
  <span class="text-orange-300">"Open"</span>, 
  <span class="text-orange-300">"modal"</span>
);
</code>
</pre>
			<div
				class="flex flex-row rounded-lg p-4 mb-6 justify-center items-center"
			>
				<GridEmerald
					:getter="() => tableWithButton"
					class="inline-block"
					style="width: 1200px"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
	import GridGreyMonochrome from "@/components/GridGreyMonochrome.vue";
	import { Table } from "@/scripts/classes";
	import OpenModal from "@/components/icons/OpenModal.vue";
	import Rocket from "@/components/icons/Rocket.vue";
	import GridDark from "@/components/GridDark.vue";
	import GridEmerald from "@/components/GridEmerald.vue";

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
		{
			id: 3,
			name: "Alice Johnson",
			age: 35,
			email: "alice@example.com",
			country: "UK",
			status: "Active",
			registered: new Date(2020, 5, 10),
			rating: 1.5613,
		},
		{
			id: 4,
			name: "Bob Brown",
			age: 28,
			email: "bob@example.com",
			country: "Australia",
			status: "Pending",
			registered: new Date(2023, 3, 8),
			rating: 1.671,
		},
		{
			id: 5,
			name: "Charlie Green",
			age: 40,
			email: "charlie@example.com",
			country: "Germany",
			status: "Active",
			registered: new Date(2019, 7, 19),
			rating: 1.771,
		},
		{
			id: 6,
			name: "Diana White",
			age: 22,
			email: "diana@example.com",
			country: "France",
			status: "Inactive",
			registered: new Date(2022, 9, 30),
			rating: 1.802,
		},
		{
			id: 7,
			name: "Ethan Black",
			age: 33,
			email: "ethan@example.com",
			country: "Spain",
			status: "Active",
			registered: new Date(2021, 12, 12),
			rating: 1.123,
		},
		{
			id: 8,
			name: "Fiona Blue",
			age: 27,
			email: "fiona@example.com",
			country: "Italy",
			status: "Pending",
			registered: new Date(2020, 2, 25),
			rating: 1.362,
		},
		{
			id: 9,
			name: "George Red",
			age: 31,
			email: "george@example.com",
			country: "Brazil",
			status: "Active",
			registered: new Date(2023, 1, 5),
			rating: 1.89,
		},
		{
			id: 10,
			name: "Hannah Yellow",
			age: 29,
			email: "hannah@example.com",
			country: "Japan",
			status: "Inactive",
			registered: new Date(2022, 6, 18),
			rating: 1.002,
		},
		{
			id: 11,
			name: "Ian Purple",
			age: 36,
			email: "ian@example.com",
			country: "Mexico",
			status: "Active",
			registered: new Date(2021, 8, 9),
			rating: 1.023,
		},
		{
			id: 12,
			name: "Julia Orange",
			age: 24,
			email: "julia@example.com",
			country: "India",
			status: "Pending",
			registered: new Date(2020, 10, 14),
			rating: 1.982,
		},
		{
			id: 13,
			name: "Kevin Gray",
			age: 38,
			email: "kevin@example.com",
			country: "China",
			status: "Active",
			registered: new Date(2022, 3, 21),
			rating: 1.569,
		},
		{
			id: 14,
			name: "Laura Pink",
			age: 26,
			email: "laura@example.com",
			country: "Russia",
			status: "Inactive",
			registered: new Date(2023, 4, 11),
			rating: 1.437,
		},
		{
			id: 15,
			name: "Mike Silver",
			age: 32,
			email: "mike@example.com",
			country: "South Africa",
			status: "Active",
			registered: new Date(2022, 12, 27),
			rating: 1.311,
		},
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

	const tableEmerald = new Table("My Table", exampleModels, options);
	const tableGray = new Table("My Table", exampleModels, options);
	const tableDark = new Table("My Table", exampleModels, options);

	const tableWithButton = new Table("My Table", exampleModels, options);
	tableWithButton.addButton(
		OpenModal,
		(model) => {
			alert(`Clicked row: ${JSON.stringify(model)}`);
		},
		"Open",
		"modal"
	);
</script>
