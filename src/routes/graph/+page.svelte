<!-- src/routes/graph/+page.svelte -->
<script lang="ts">
	import { SvelteFlow, Controls, Background, MiniMap } from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';

	import Sidebar from './menu/sidebar.svelte';
	import GraphPanel from './flow/graphs-panel.svelte';
	import GraphControl from './flow/graphs-button.svelte';
	import { currentNodes, currentEdges } from './flow/graphs.store.svelte';
	import NodeLayout from './flow/node-layout.svelte';

	// sidebar toggle
	let menuOpen = $state(false);
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	// slide offset when sidebar open
	let contentOffset = $derived(menuOpen ? 200 : 0);

	// custom node types
	const nodeTypes = {
		textNode: NodeLayout
	};
</script>

<Sidebar open={menuOpen} onToggle={toggleMenu} />

<div class="content-wrapper" style="transform: translateX({contentOffset}px)">
	<div class="panel-container">
		<GraphPanel />
	</div>
	<GraphControl>
		<SvelteFlow bind:nodes={$currentNodes} bind:edges={$currentEdges} {nodeTypes} fitView>
			<Controls />
			<Background />
			<MiniMap />
		</SvelteFlow>
	</GraphControl>
</div>

<style>
	.panel-container {
		position: absolute;
		width: 100%;
		z-index: 10;
	}

	.content-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 50px);
		transition: transform 0.3s ease;
	}
</style>
