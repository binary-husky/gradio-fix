<script lang="ts">
	import { onMount } from "svelte";

	export let init_x: string;
	export let init_y: string;
	export let width: string;
	export let len_y: string;
	export let equal_height = true;
	export let elem_id: string;
	export let elem_classes: string[] = [];
	export let visible = true;
	export let variant: "default" | "panel" | "compact" = "default";

	$: styles = {
		init_x,
		init_y,
		width,
		len_y,
	};

	$: cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(";");

	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;

	let container: HTMLDivElement;

	onMount(() => {
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	});

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		offsetX = event.clientX - container.offsetLeft;
		offsetY = event.clientY - container.offsetTop;
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			container.style.left = event.clientX - offsetX + "px";
			container.style.top = event.clientY - offsetY + "px";
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}
</script>

<div
	class:compact={variant === "compact"}
	class:panel={variant === "panel"}
	class:unequal-height={equal_height === false}
	class:stretch={equal_height}
	class:hide={!visible}
	class:floating-component={false === false}
	id={elem_id}
	bind:this={container}
	style={cssVarStyles}
	class={elem_classes.join(" ")}
	on:mousedown={handleMouseDown}
>
	<slot />
</div>

<style>

	.hide {
		display: none;
	}
	.compact > :global(*),
	.compact :global(.box) {
		border-radius: 0;
	}
	.compact,
	.panel {
		border-radius: var(--container-radius);
		background: var(--background-fill-secondary);
		padding: var(--size-2);
	}
	.unequal-height {
		align-items: flex-start;
	}

	.stretch {
		align-items: stretch;
	}

	div > :global(*),
	div > :global(.form > *) {
		flex: 1 1 0%;
		flex-wrap: wrap;
		min-width: min(20px, 100%);
	}

	.floating-component {
		position: fixed;
		z-index: 100;
		border: 1px solid #000;
		padding: 10px;
		border-radius: 5px;
		width: var(--width);
		left: var(--init_x);
		top: var(--init_y);
		overflow: visible;
		gap: var(--layout-gap);
	}
</style>
