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
	let isRestoring = false;

	// 创建自定义事件
	const LOCAL_STORAGE_UPDATED = "gptac_conversation_history_updated";
	function handleStorageChange(event: Event) {
		const storageEvent = event as CustomEvent;
		isRestoring = true;
		setTimeout(() => {
			isRestoring = false;
		}, 1000); // Reset after 1 second
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
	}

	function handleAction(
		action: "delete" | "restore" | "cancel" | "delete_all"
	) {
		if (selectedItemIndex === null || action === "cancel") {
			showPopup = false;
			return;
		}

		if (action === "delete") {
			conversationHistory = conversationHistory.filter(
				(_, i) => i !== selectedItemIndex
			);
		} else if (action === "restore") {
			isRestoring = true;
			setTimeout(() => {
				isRestoring = false;
			}, 1000); // Reset after 1 second

			const itemToMove = conversationHistory[selectedItemIndex];
			itemToMove.timestamp = new Date().toISOString();
			conversationHistory = [
				itemToMove,
				...conversationHistory.filter((_, i) => i !== selectedItemIndex)
			];
			window.dispatchEvent(
				new CustomEvent("gptac_restore_chat_from_local_storage", {
					detail: itemToMove
				})
			);
		} else if (action === "delete_all") {
			conversationHistory = [];
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

<div class="spark-container" class:restoring={isRestoring}>
	<div class="dot-chain">
		{#each conversationHistory as item, index}
			<div class="dot-container">
				{#if index !== 0}
					<div class="connecting-line"></div>
				{:else}
					<div class="connecting-line-half"></div>
				{/if}
				<div
					class="dot"
					on:click={(e) => handleDotClick(e, index)}
					role="button"
					tabindex="0"
				>
					<p class="tooltip">{item.preview}</p>
				</div>
				{#if index == conversationHistory.length - 1}
					<div class="connecting-line-half"></div>
				{/if}
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
				<h3>恢复或删除对话内容</h3>
				<p class="conversation-text">
					{conversationHistory[selectedItemIndex]?.preview}
				</p>
				<div class="button-group">
					<button on:click={() => handleAction("restore")}>恢复</button>
					<button on:click={() => handleAction("delete")}>删除</button>
					<button on:click={() => handleAction("delete_all")}
						>删除全部历史</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
<h1>{value}</h1>

<style>
	.spark-container {
		position: fixed;
		width: 2%;
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

	.dot-container:first-child .dot {
		background-color: var(--first-dot-color, #00ff00);
	}

	.dot {
		position: relative;
		width: 7px;
		height: 7px;
		background-color: #ffd90081;
		cursor: pointer;
		transition: all 0.3s ease;
		transform: rotate(45deg);
		box-shadow: 0 0 1px #ffd700;
		filter: blur(0.001px);
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
		box-shadow: 0 0 1px #ff0000;
		filter: blur(0.001px);
	}

	.dot:hover {
		transform: none;
		background-color: transparent;
	}

	.connecting-line {
		width: 2px;
		height: 30px;
		background-color: #80808080;
		margin: 0px 0;
	}

	.connecting-line-half {
		width: 2px;
		height: 15px;
		background-color: #80808080;
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
		white-space: pre-wrap;
		opacity: 0;
		width: 30vw;
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
		background: var(--background-fill-primary);
		border-radius: 8px;
		padding: 20px;
		width: 400px;
		position: relative;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.507);
		backdrop-filter: blur(4px);
		color: var(--body-text-color);
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
		background-color: var(--input-background-fill);
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
		white-space: pre-wrap;
		background-color: var(--input-background-fill);
		border-radius: 4px;
		min-height: 60px;
		max-height: 70vh;
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
		background-color: var(--input-background-fill);
		transition: background-color 0.2s;
	}

	.button-group button:hover {
		background-color: var(--secondary-500);
	}

	:global(.restoring) .dot-container:first-child .dot {
		--first-dot-color: #ff00ff;
		transition: background-color 0.3s ease;
	}
</style>
