<script lang="ts">
	import { getContext, onMount, createEventDispatcher, tick } from "svelte";
	import { TABS } from "./Tabs.svelte";
	import { Component as Column } from "./../../app/src/components/Column";
	import type { SelectData } from "@gradio/utils";

	// 修改：将clickOutside函数移到组件内部，不再立即执行
	let handleClick: ((event: MouseEvent) => void) | null = null;

	function setupClickOutsideListener(node: HTMLElement) {
		// 创建事件处理函数
		handleClick = (event: MouseEvent) => {
			// console.log("handle click menu");
			if (!node.contains(event.target as Node)) {
				if (
					node.parentNode &&
					!node.parentNode.contains(event.target as Node)
				) {
					// 检查当前选中的标签页是否与目标标签页ID不匹配
					if ($selected_tab === id) {
						// console.log("hide menu");
						$selected_tab = "";
						removeClickOutsideListener();
					}
				}
			}
		};

		// 添加事件监听器
		document.addEventListener("click", handleClick, true);
	}

	function removeClickOutsideListener() {
		// 移除事件监听器
		if (handleClick) {
			document.removeEventListener("click", handleClick, true);
			handleClick = null;
		}
	}

	export let elem_id: string = "";
	export let elem_classes: Array<string> = [];
	export let name: string;
	export let id: string | number | object = {};

	const dispatch = createEventDispatcher<{ select: SelectData }>();

	const { register_tab, unregister_tab, selected_tab, selected_tab_index } =
		getContext(TABS) as any;

	let tab_index = register_tab({ name, id });
	let node: HTMLElement;

	onMount(() => {
		return () => {
			unregister_tab({ name, id });
			removeClickOutsideListener();
		};
	});

	$: {
		// 监听 `$selected_tab_index` 是否等于当前 `tab_index`
		if ($selected_tab_index === tab_index) {
			tick().then(() => {
				// 标签页被选中时添加事件监听器
				if (node && $selected_tab === id && !handleClick) {
					setupClickOutsideListener(node);
				}
				dispatch("select", {
					value: name,
					index: tab_index
				});
			});
		} else {
			if (handleClick) {
				// 标签页未被选中时移除事件监听器
				removeClickOutsideListener();
			}
		}
	}
</script>

<div
	bind:this={node}
	id={elem_id}
	class="tabitem {elem_classes.join(' ')}"
	style:display={$selected_tab === id ? "block" : "none"}
>
	<Column>
		<slot />
	</Column>
</div>

<style>
	div {
		display: flex;
		position: relative;
		border: 1px solid var(--border-color-primary);
		border-top: none;
		border-bottom-right-radius: var(--container-radius);
		border-bottom-left-radius: var(--container-radius);
		padding: var(--block-padding);
		background: var(--block-background-fill);
	}
</style>
