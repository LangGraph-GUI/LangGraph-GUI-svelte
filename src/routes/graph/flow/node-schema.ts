// routes/graph/flow/node-schema.ts

export interface JsonNodeData {
	uniq_id: string;
	name: string;
	description: string;
	nexts: string[];
	type?: string;
	tool: string;
	true_next: string | null;
	false_next: string | null;
	ext: {
		pos_x?: number;
		pos_y?: number;
		width?: number;
		height?: number;
		info?: string | null;
	};
}

import type { Node } from '@xyflow/svelte';

export type FlowNodeData = {
	description: string;
	name: string;
	type: string;
};

export type FlowNode = Node<FlowNodeData>;

export function JsonNodeToSvelteNode(json: JsonNodeData): FlowNode {
	return {
		id: json.uniq_id,
		type: 'textNode',

		data: {
			name: json.name,
			description: json.description,
			type: json.type
		} as FlowNodeData,
		position: {
			x: json.ext.pos_x ?? 0,
			y: json.ext.pos_y ?? 0
		}
	};
}

export function SvelteNodeToJsonNode(node: FlowNode): JsonNodeData {
	return {
		uniq_id: node.id,
		name: node.data.name,
		description: node.data.description,
		nexts: [],
		type: node.data.type,
		tool: '',
		true_next: null,
		false_next: null,
		ext: {
			pos_x: node.position.x,
			pos_y: node.position.y,
			width: undefined,
			height: undefined,
			info: null
		}
	};
}
