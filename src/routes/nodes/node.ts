import express from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { PublicRequest } from '../../types/app-request'
import { SuccessResponse } from '../../core/ApiResponse'
import NodeRepo from '../../database/repository/NodeRepo'

const router = express.Router()

router.get(
    '/all',
    asyncHandler(async (req: PublicRequest, res) => {
        const nodesResponse = await NodeRepo.getAllNodes()
        new SuccessResponse('Success', {
            nodes: nodesResponse
        }).send(res)
    })
)

router.post(
    '/create/nodes',
    asyncHandler(async (req: PublicRequest, res) => {
        const nodesObj = req.body
        NodeRepo.createNodes(nodesObj)
        new SuccessResponse('Success', 
            nodesObj
        ).send(res)
    })
)
export default router
