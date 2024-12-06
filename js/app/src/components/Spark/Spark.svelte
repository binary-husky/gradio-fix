<svelte:options accessors={true} />

<script lang="ts">
	import { Spark } from "@gradio/form"; // 导入 Spark 组件
	import { Block } from "@gradio/atoms";
	import type { Styles } from "@gradio/utils";

	export let label: string = "Spark";
	export let elem_id: string = "";
	export let visible: boolean = true;
	export let value: string;
	export let show_label: boolean;

	export let mode: "static" | "dynamic";
</script>

<Spark
	bind:value
	{label}
	{show_label}
	on:change
	on:submit
	disabled={mode === "static"}
/>
