import { UUID, randomUUID } from 'crypto';
export interface Node {
    _id: UUID
    name: string 
    description: string
    nodes: Node
}

class NodeModel { 
    private nodes: Node[] = []
    addNode(nodes: Node[]): Node[] {
        this.nodes = this.nodes.concat(nodes)
        return nodes
    }

    getAllNodes(): Node[] { 
        return this.nodes
    }
}

export const nodeModel = new NodeModel()