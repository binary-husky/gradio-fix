<script lang="ts">
	import type { FileData } from "@gradio/upload";
	import { normalise_file } from "@gradio/upload";
	import { Block } from "@gradio/atoms";
	import type { LoadingStatus } from "../StatusTracker/types";
	import { _ } from "svelte-i18n";
	import { onMount } from "svelte";

	export let elem_id: string = "";
	export let elem_classes: Array<string> = [];
	export let visible: boolean = true;
	export let value: null | FileData = null;
	export let mode: "static" | "dynamic";
	export let root: string;
	export let root_url: null | string;
	export let clearColor: Array<number>;

	export let loading_status: LoadingStatus;
	export let label: string;
	export let show_label: boolean;

	let _value: null | FileData;
	$: _value = normalise_file(value, root, root_url);

	let dragging = false;

	//////////////////////////
	let canvas_handle;
	import * as THREE from "three";

	onMount(() => {
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const geometry = new THREE.BoxGeometry();
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		let renderer;
		scene.add(cube);
		camera.position.z = 5;

		const animate = () => {
			requestAnimationFrame(animate);
			cube.rotation.x += 0.01;
			cube.rotation.y += 0.01;
			renderer.render(scene, camera);
		};

		const resize = () => {
			let ratio = 0.9;
			renderer.setSize(window.innerWidth * ratio, window.innerHeight * ratio);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};

		window.addEventListener("resize", resize);
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: canvas_handle
		});
		resize();
		animate();
	});
	///////////////////////////
</script>

<!-- <Block
	{visible}
	variant={value === null ? "dashed" : "solid"}
	border_mode={dragging ? "focus" : "base"}
	padding={false}
	{elem_id}
	{elem_classes}
>
</Block> -->
<div id="container">
	<canvas bind:this={canvas_handle} />
</div>

<!-- // override // override -->
<!-- qwdqwdwqd
	<canvas bind:this={canvas_handle} /> -->

<style>
	#container {
		width: 50%;
		height: 50%;
	}
</style>
