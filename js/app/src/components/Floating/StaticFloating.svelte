<script lang="ts">
	import { onMount } from "svelte";

	export let init_x: string;
	export let init_y: string;
	export let width: string;
	export let drag: string;
	export let equal_height = true;
	export let elem_id: string;
	export let elem_classes: string[] = [];
	export let visible = true;
	export let variant: "default" | "panel" | "compact" = "default";

	$: styles = {
		init_x,
		init_y,
		width,
		drag
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
		if (drag != "forbidden") {
			isDragging = true;
			offsetX = event.clientX - container.offsetLeft;
			offsetY = event.clientY - container.offsetTop;
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (drag != "forbidden") {
			if (isDragging) {
				container.style.left = event.clientX - offsetX + "px";
				container.style.top = event.clientY - offsetY + "px";
				if (event.clientY - offsetY < 0) {
					container.style.top = "0px";
				}
			}
		}
	}

	function handleMouseUp() {
		if (drag != "forbidden") {
			isDragging = false;
		}
	}
</script>

<div
	class:compact={variant === "compact"}
	class:panel={variant === "panel"}
	class:unequal-height={equal_height === false}
	class:stretch={equal_height}
	class:hide={!visible}
	class:floating-component={true}
	id={elem_id}
	bind:this={container}
	style={cssVarStyles}
	class={elem_classes.join(" ")}
	on:mousedown={drag === "everywhere" ? handleMouseDown : null}
>
	<div
		class:drag-area={true}
		class:hide={!(visible && drag === "top")}
		style="height: {visible && drag === 'top' ? '20px' : '0px'};"
		on:mousedown={handleMouseDown}
	>
		拖动此处 (drag here to move)
		<button
			class="close-button"
			on:click={() => {
				console.log("clicked");
				push_data_to_gradio_component(
					{
						visible: false,
						__type__: "update"
					},
					elem_id,
					"obj"
				);
				// visible = false;
			}}
			class:hide={!visible}
			style="position: absolute; right: 5px;"
		>
			×
		</button>
	</div>
	<slot />
</div>

<style>
	.drag-area {
		background: var(--background-fill-secondary);
		justify-content: center;
		align-items: center;
	}

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
		padding: 5px;
		border-radius: 5px;
		width: var(--width);
		left: var(--init_x);
		top: var(--init_y);
		overflow: visible;
		gap: var(--layout-gap);
	}

	.close-button:hover {
		background-color: var(--primary-500);
	}
</style>
