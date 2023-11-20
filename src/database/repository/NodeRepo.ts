import { nodeModel, Node } from "../model/Node"

async function getAllNodes(): Promise<Node[]> {
    return nodeModel.getAllNodes()
}

async function createNodes(nodes: Node[]): Promise<{ nodes: Node[] }> {
    const createdNode = nodeModel.addNode(
        nodes
    )
    return {
        nodes: createdNode
    }
}

export default {
    getAllNodes,
    createNodes
}
