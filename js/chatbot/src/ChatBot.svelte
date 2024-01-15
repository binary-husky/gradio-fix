<script lang="ts">
	import { beforeUpdate, afterUpdate, createEventDispatcher } from "svelte";
	import type { Styles, SelectData } from "@gradio/utils";
	import type { FileData } from "@gradio/upload";
	import Copy from "./Copy.svelte";

	export let value: Array<
		[string | FileData | null, string | FileData | null]
	> | null;
	let old_value: Array<
		[string | FileData | null, string | FileData | null]
	> | null = null;
	export let pending_message: boolean = false;
	export let feedback: Array<string> | null = null;
	export let style: Styles = {};
	export let selectable: boolean = false;

	let div: HTMLDivElement;
	let autoscroll: Boolean;

	const dispatch = createEventDispatcher<{
		change: undefined;
		select: SelectData;
	}>();

	function countMatchingChars(str1: string, str2: string) {
		if (str1.length > str2.length) {
			// 如果新字符串长度反而多，直接排除
			return 0;
		}
		if (str1.split("\n").length <= 1) {
			// 如果旧字符串长度只有一行，直接排除
			return 0;
		}
		let count = 0;
		let minLength = Math.min(str1.length, str2.length);
		for (let i = 0; i < minLength; i++) {
			if (str1[i] !== str2[i]) {
				count = 0;
				return 0;
			}
			count++;
		}
		return count;
	}

	function preserveMermaidGraphIfPossible(
		value: string,
		mermaid_block_arr_old
	) {
		var parser = new DOMParser(); // 创建一个新的DOM解析器
		var newdoc = parser.parseFromString(value, "text/html"); // 解析字符串为文档
		let mermaid_block_arr_new = newdoc.querySelectorAll(`pre.mermaid`);
		let need_reload = false;

		for (let i = 0; i < mermaid_block_arr_new.length; i++) {
			var mermaid_block_new = mermaid_block_arr_new[i];
			let codeContentNew = mermaid_block_new.querySelector("code")?.textContent;
			if (codeContentNew) {
				// 选择一个最多匹配的显示
				let best_match = -1;
				let best_match_n_char = -1;
				for (let j = 0; j < mermaid_block_arr_old.length; j++) {
					var mermaid_block_old = mermaid_block_arr_old[j];
					let codeContentOld =
						mermaid_block_old.querySelector("code_finish_render")?.textContent;
					if (codeContentOld) {
						let match_n_char = countMatchingChars(
							codeContentOld,
							codeContentNew
						);
						if (match_n_char > 10 && match_n_char > best_match_n_char) {
							best_match = j;
							best_match_n_char = match_n_char;
						}
					}
				}
				if (best_match_n_char > 10) {
					// update code
					let mermaid_block_old_clone =
						mermaid_block_arr_old[best_match].cloneNode(true);
					mermaid_block_old_clone.querySelector("code").textContent =
						codeContentNew;
					// replace
					mermaid_block_arr_new[i].replaceWith(mermaid_block_old_clone);
					// console.log(codeContentNew);
					need_reload = true;
				} else {
					// console.log("no match");
				}
			}
		}
		if (need_reload) {
			var serializer = new XMLSerializer();
			var docString = serializer.serializeToString(newdoc);
			return docString;
		} else {
			return value;
		}
	}

	function PreserveOldRender(
		value: Array<[string | FileData | null, string | FileData | null]> | null
	) {
		if (value) {
			let mermaid_block_arr_old = document.querySelectorAll(`pre.mermaid`);
			let mermaidBlocksWithFinishRender = mermaid_block_arr_old;
			// let mermaidBlocksWithFinishRender = Array.from(
			// 	mermaid_block_arr_old
			// ).filter((block) => {
			// 	return block.querySelector("code_pending_render") !== null;
			// });
			if (mermaidBlocksWithFinishRender.length != 0) {
				for (let i = 0; i < value.length; i++) {
					if (value[i]) {
						for (let j = 0; j < 2; j++) {
							if (value[i].length >= 1 && typeof value[i][j] === "string") {
								value[i][j] = preserveMermaidGraphIfPossible(
									value[i][j],
									mermaidBlocksWithFinishRender
								);
							}
						}
					}
				}
			}
		}
		return value;
	}

	beforeUpdate(() => {
		autoscroll =
			div && div.offsetHeight + div.scrollTop > div.scrollHeight - 100;
	});

	afterUpdate(() => {
		if (autoscroll) {
			div.scrollTo(0, div.scrollHeight);
			div.querySelectorAll("img").forEach((n) => {
				n.addEventListener("load", () => {
					div.scrollTo(0, div.scrollHeight);
				});
			});
		}
		div.querySelectorAll("pre > code").forEach((n) => {
			let code_node = n as HTMLElement;
			let copy_div_exist = false;
			if (code_node.parentElement) {
				let buttonElement = code_node.parentElement.querySelector("button");
				if (buttonElement) {
					copy_div_exist = true;
				}
			}
			if (copy_div_exist) {
				return;
				// button element is inside code_node
			} else {
				const copy_div = document.createElement("div");
				new Copy({
					target: copy_div,
					props: {
						value: code_node.innerText.trimEnd()
					}
				});
				let node = n.parentElement as HTMLElement;
				copy_div.style.position = "absolute";
				copy_div.style.right = "0";
				copy_div.style.top = "0";
				copy_div.style.zIndex = "1";
				copy_div.style.padding = "var(--spacing-md)";
				copy_div.style.borderBottomLeftRadius = "var(--radius-sm)";
				node.style.position = "relative";
				node.appendChild(copy_div);
			}
		});
	});

	function is_markdown_body(
		htmlString: string,
		i: Number,
		value: Array<[string | FileData | null, string | FileData | null]>
	) {
		// <!-- 只在最新的消息中应用精细HTML划分 -->
		if (i != value.length - 1) {
			return false;
		}
		var parser = new DOMParser(); // 创建一个新的DOM解析器
		var doc = parser.parseFromString(htmlString, "text/html"); // 解析字符串为文档
		var markdownBody = doc.querySelector(".markdown-body"); // 选择markdown-body类的元素
		if (!markdownBody) {
			return false;
		}
		return true;
	}

	function htmlStringToParagraphs(htmlString: string) {
		var parser = new DOMParser(); // 创建一个新的DOM解析器
		var doc = parser.parseFromString(htmlString, "text/html"); // 解析字符串为文档
		var markdownBody = doc.querySelector(".markdown-body"); // 选择markdown-body类的元素
		var paragraphStrings = markdownBody
			? Array.from(markdownBody.childNodes).map(function (element) {
					if (element.nodeType === Node.ELEMENT_NODE) {
						return (element as HTMLElement).outerHTML; // HTMLElement always has outerHTML
					}
					if (element.nodeType === Node.TEXT_NODE) {
						return element.textContent; // TEXT_NODE always has textContent
					}
					return ""; // Fallback for other node types
				})
			: [];
		return paragraphStrings;
	}

	$: {
		if (value !== old_value) {
			// try {
			// 	console.log("before", value[value.length - 1][1]);
			// } catch {}
			value = PreserveOldRender(value);
			// try {
			// 	console.log("after", value[value.length - 1][1]);
			// } catch {}
			old_value = value;
			dispatch("change");
		}
	}
</script>

<div
	class="wrap"
	style:height={`${style.height}px`}
	style:max-height={`${style.height}px`}
	bind:this={div}
>
	<div class="message-wrap">
		{#if value !== null}
			{#each value as message_pair, i}
				{#each message_pair as message, j}
					{#if message !== null && message !== ""}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							data-testid={j == 0 ? "user" : "bot"}
							class:latest={i === value.length - 1}
							class="message {j == 0 ? 'user' : 'bot'}"
							class:hide={message === null}
							class:selectable
							on:click={() =>
								dispatch("select", {
									index: [i, j],
									value: message
								})}
						>
							{#if typeof message === "string"}
								{#if i == value.length - 1 && j == 1 && is_markdown_body(message, i, value)}
									<!-- 只在最新的消息中应用精细HTML划分 -->
									<div class="markdown-body">
										<!-- {@html message} -->
										{#each htmlStringToParagraphs(message) as cc, j}
											{@html cc}
										{/each}
									</div>
								{:else}
									{@html message}
								{/if}

								{#if feedback && j == 1}
									<div class="feedback">
										{#each feedback as f}
											<button>{f}</button>
										{/each}
									</div>
								{/if}
							{:else if message !== null && message.mime_type?.includes("audio")}
								<audio
									controls
									preload="metadata"
									src={message.data}
									title={message.alt_text}
									on:play
									on:pause
									on:ended
								/>
							{:else if message !== null && message.mime_type?.includes("video")}
								<video
									controls
									src={message.data}
									title={message.alt_text}
									preload="auto"
									on:play
									on:pause
									on:ended
								>
									<track kind="captions" />
								</video>
							{:else if message !== null && message.mime_type?.includes("image")}
								<img src={message.data} alt={message.alt_text} />
							{/if}
						</div>
					{/if}
				{/each}
			{/each}
		{/if}
		{#if pending_message}
			<div class="message pending">
				<div class="dot-flashing" />
				&nbsp;
				<div class="dot-flashing" />
				&nbsp;
				<div class="dot-flashing" />
			</div>
		{/if}
	</div>
</div>

<style>
	.wrap {
		padding: var(--block-padding);
		height: 100%;
		max-height: 480px;
		overflow-y: auto;
	}

	.message-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xxl);
	}

	.message-wrap > div :global(img) {
		border-radius: 13px;
		max-width: 30vw;
	}

	.message-wrap :global(audio) {
		width: 100%;
	}

	.message {
		position: relative;
		align-self: flex-start;
		border-width: 1px;
		border-radius: var(--radius-xxl);
		background: var(--background-fill-secondary);
		padding: var(--spacing-xxl);
		width: calc(100% - var(--spacing-xxl));
		color: var(--body-text-color);
		font-size: var(--text-lg);
		line-height: var(--line-lg);
		overflow-wrap: break-word;
	}
	.user {
		align-self: flex-end;
		border-bottom-right-radius: 0;
	}
	.bot {
		border-bottom-left-radius: 0;
		padding-left: calc(2 * var(--spacing-xxl));
	}
	@media (max-width: 480px) {
		.message {
			width: auto;
		}
		.bot {
			padding-left: var(--spacing-xxl);
		}
	}

	/* Colors */
	.bot,
	.pending {
		border-color: var(--border-color-primary);
		background: var(--background-fill-secondary);
	}
	.user {
		border-color: var(--border-color-accent);
		background-color: var(--color-accent-soft);
	}
	.feedback {
		display: flex;
		position: absolute;
		top: var(--spacing-xl);
		right: calc(var(--spacing-xxl) + var(--spacing-xl));
		gap: var(--spacing-lg);
		font-size: var(--text-sm);
	}
	.feedback button {
		color: var(--body-text-color-subdued);
	}
	.feedback button:hover {
		color: var(--body-text-color);
	}
	.selectable {
		cursor: pointer;
	}

	.pending {
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 2px;
	}
	.dot-flashing {
		animation: dot-flashing 1s infinite linear alternate;
		border-radius: 5px;
		background-color: var(--body-text-color);
		width: 5px;
		height: 5px;
		color: var(--body-text-color);
	}
	.dot-flashing:nth-child(2) {
		animation-delay: 0.33s;
	}
	.dot-flashing:nth-child(3) {
		animation-delay: 0.66s;
	}

	/* Small screen */
	@media (max-width: 480px) {
		.user {
			align-self: flex-end;
		}
		.bot {
			align-self: flex-start;
			padding-left: var(--size-3);
		}
	}

	@keyframes dot-flashing {
		0% {
			opacity: 0.8;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.8;
		}
	}
	.message-wrap .message :global(img) {
		margin: var(--size-2);
		max-height: 200px;
	}
	.message-wrap .message :global(a) {
		color: var(--color-text-link);
		text-decoration: underline;
	}

	.hide {
		display: none;
	}

	/* Code blocks */
	.message-wrap :global(pre[class*="language-"]),
	.message-wrap :global(pre) {
		/* margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
		box-shadow: none;
		border: none;
		border-radius: var(--radius-md);
		background-color: var(--chatbot-code-background-color); */
		padding: 0px;
	}

	/* Tables */
	.message-wrap :global(table),
	.message-wrap :global(tr),
	.message-wrap :global(td),
	.message-wrap :global(th) {
		margin-top: var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
		padding: var(--spacing-xl);
	}

	.message-wrap .bot :global(table),
	.message-wrap .bot :global(tr),
	.message-wrap .bot :global(td),
	.message-wrap .bot :global(th) {
		border: 1px solid var(--border-color-primary);
	}

	.message-wrap .user :global(table),
	.message-wrap .user :global(tr),
	.message-wrap .user :global(td),
	.message-wrap .user :global(th) {
		border: 1px solid var(--border-color-accent);
	}

	/* Lists */
	.message-wrap :global(ol),
	.message-wrap :global(ul) {
		padding-inline-start: 2em;
	}

	/* KaTeX */
	.message-wrap :global(span.katex) {
		font-size: var(--text-lg);
	}
</style>
