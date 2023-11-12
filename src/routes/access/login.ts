import express from 'express'
import validator from '../../helpers/validator'
import schema from './schema'
import asyncHandler from '../../helpers/asyncHandler'
import { PublicRequest } from '../../types/app-request'
import { AuthFailureError, BadRequestError } from '../../core/ApiError'
import UserRepo from '../../database/repository/UserRepo'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyStoreRepo from '../../database/repository/KeyStoreRepo'
import { SuccessResponse } from '../../core/ApiResponse'
import { createTokens } from '../../auth/authUtils'
import { getUserData } from './utils'

const router = express.Router()

router.post(
    '/basic',
    validator(schema.credential),
    asyncHandler(async (req: PublicRequest, res) => {
        const user = await UserRepo.findByEmail(req.body.email)
        if (!user) throw new BadRequestError('User not registered')
        if (!user.password) throw new BadRequestError('Credential not set')

        if (req.body.password !== user.password) {
            throw new AuthFailureError('Authentication failure')
        }
        // const match = await bcrypt.compare(req.body.password, user.password)

        const accessTokenKey = crypto.randomBytes(64).toString('hex')

        await KeyStoreRepo.create(user, accessTokenKey)
        const tokens = await createTokens(user, accessTokenKey)
        const userData = await getUserData(user)

        new SuccessResponse('Login Success', {
            user: userData,
            tokens: tokens
        }).send(res)
    })
)

export default router
