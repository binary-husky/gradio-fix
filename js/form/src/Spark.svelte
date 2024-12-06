<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { get_styles } from "@gradio/utils";
	import { BlockTitle } from "@gradio/atoms";
	import type { Styles } from "@gradio/utils";

	export let value: string = "";
	export let style: Styles = {};
	export let label: string;
	export let disabled = false;
	export let show_label: boolean = true;

	let conversationHistory: any[] = [];
	let selectedItemIndex: number | null = null;
	let showPopup = false;
	let popupPosition = { x: 0, y: 0 };

	// 创建自定义事件
	const LOCAL_STORAGE_UPDATED = "gptac_conversation_history_updated";
	function handleStorageChange(event: Event) {
		const storageEvent = event as CustomEvent;
		// if (storageEvent.detail?.key === "conversation_history") {
		// 	conversationHistory = JSON.parse(storageEvent.detail.newValue || "[]");
		// 	console.log("Conversation History Updated:", conversationHistory);
		// }
		// console.log("Conversation History Updated:");
		conversationHistory = JSON.parse(
			localStorage.getItem("conversation_history") || "[]"
		);
	}

	onMount(() => {
		conversationHistory = JSON.parse(
			localStorage.getItem("conversation_history") || "[]"
		);
		window.addEventListener(LOCAL_STORAGE_UPDATED, handleStorageChange);
		return () => {
			window.removeEventListener(LOCAL_STORAGE_UPDATED, handleStorageChange);
		};
	});

	$: value;
	$: handle_change(value);

	const dispatch = createEventDispatcher<{
		change: string;
		submit: undefined;
	}>();

	function handleDotClick(event: MouseEvent, index: number) {
		selectedItemIndex = index;
		showPopup = true;

		// // Calculate initial position at mouse cursor
		// let x = event.clientX + 5;
		// let y = event.clientY + 5;

		// // Ensure popup stays within viewport
		// const viewportWidth = window.innerWidth;
		// const viewportHeight = window.innerHeight;
		// const popupWidth = 100; // Approximate popup width
		// const popupHeight = 120; // Approximate popup height

		// // Adjust if popup would go beyond right edge
		// if (x + popupWidth > viewportWidth) {
		// 	x = viewportWidth - popupWidth - 5;
		// }

		// // Adjust if popup would go beyond bottom edge
		// if (y + popupHeight > viewportHeight) {
		// 	y = viewportHeight - popupHeight - 5;
		// }

		// popupPosition = { x, y };
		// console.log(popupPosition);
	}

	function handleAction(action: "delete" | "duplicate" | "cancel") {
		if (selectedItemIndex === null || action === "cancel") {
			showPopup = false;
			return;
		}

		if (action === "delete") {
			conversationHistory = conversationHistory.filter(
				(_, i) => i !== selectedItemIndex
			);
		} else if (action === "duplicate") {
			const itemToDuplicate = conversationHistory[selectedItemIndex];
			conversationHistory = [itemToDuplicate, ...conversationHistory];
			window.dispatchEvent(
				new CustomEvent("gptac_restore_chat_from_local_storage", {
					detail: itemToDuplicate
				})
			);
		}

		// Save to localStorage
		localStorage.setItem(
			"conversation_history",
			JSON.stringify(conversationHistory)
		);
		showPopup = false;
	}

	function handle_change(val: string) {
		dispatch("change", val);
	}
</script>

<div class="spark-container">
	<div class="dot-chain">
		{#each conversationHistory as item, index}
			<div class="dot-container">
				{#if index !== 0}
					<div class="connecting-line"></div>
				{/if}
				<div
					class="dot"
					on:click={(e) => handleDotClick(e, index)}
					role="button"
					tabindex="0"
				>
					<span class="tooltip">{item.preview}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
{#if showPopup}
	<div class="overlay">
		<div class="modal">
			<button class="close-button" on:click={() => handleAction("cancel")}
				>×</button
			>
			<div class="modal-content">
				<h3>对话内容</h3>
				<p class="conversation-text">
					{conversationHistory[selectedItemIndex]?.preview}
				</p>
				<div class="button-group">
					<button on:click={() => handleAction("delete")}>删除对话</button>
					<button on:click={() => handleAction("duplicate")}>复制对话</button>
					<button on:click={() => handleAction("cancel")}>取消</button>
				</div>
			</div>
		</div>
	</div>
{/if}
<h1>{value}</h1>

<style>
	.spark-container {
		position: fixed;
		left: 3px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1000;
	}

	.dot-chain {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 6px;
		gap: 0px;
	}

	.dot-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dot {
		position: relative;
		width: 7px;
		height: 7px;
		background-color: #ffd700;
		cursor: pointer;
		transition: all 0.3s ease;
		transform: rotate(45deg);
	}

	.dot:hover::after {
		content: "";
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #ff0000;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(45deg);
		z-index: -1;
	}

	.dot:hover {
		transform: none;
		background-color: transparent;
	}

	.connecting-line {
		width: 2px;
		height: 30px;
		background-color: #808080;
		margin: 0px 0;
	}

	.tooltip {
		position: absolute;
		left: 30px;
		top: 50%;
		transform: translateY(-50%);
		background-color: #333;
		color: white;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 14px;
		white-space: nowrap;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.3s ease,
			visibility 0.3s ease;
	}

	.dot:hover .tooltip {
		opacity: 1;
		visibility: visible;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1001;
	}

	.modal {
		background: rgba(var(--background-fill-primary), 0.99);
		border-radius: 8px;
		padding: 20px;
		width: 400px;
		position: relative;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.507);
		backdrop-filter: blur(4px);
	}

	.close-button {
		position: absolute;
		top: 10px;
		right: 10px;
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
	}

	.close-button:hover {
		background-color: var(--neutral-800);
	}

	.modal-content {
		margin-top: 10px;
	}

	.modal-content h3 {
		margin: 0 0 15px 0;
		font-size: 18px;
	}

	.conversation-text {
		margin: 15px 0;
		padding: 10px;
		background-color: var(--neutral-500);
		border-radius: 4px;
		min-height: 60px;
	}

	.button-group {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.button-group button {
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		background-color: var(--neutral-800);
		transition: background-color 0.2s;
	}

	.button-group button:hover {
		background-color: var(--secondary-500);
	}
</style>
