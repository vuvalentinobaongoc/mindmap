import { Tokens } from '../types/app-request'
import { AuthFailureError, InternalError } from '../core/ApiError'
import JWT, { JwtPayload } from '../core/JWT'
import User from '../database/model/User'
import { tokenInfo } from '../config'

export const getAccessToken = (authorization?: string) => {
    if (!authorization) throw new AuthFailureError('Invalid Authorization')
    if (!authorization.startsWith('Bearer ')) throw new AuthFailureError('Invalid Authorization')
    return authorization.split(' ')[1]
}

export const validateTokenData = (payload: JwtPayload): boolean => {
    if (
        !payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== tokenInfo.issuer ||
        payload.aud !== tokenInfo.audience ||
        isValidObjectId(payload.sub)
    )
        throw new AuthFailureError('Invalid Access Token')
    return true
}

export const isValidObjectId = (id: string): boolean => {
    // ObjectId format regex (12-byte hexadecimal number)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/
    return objectIdRegex.test(id)
}

export const createTokens = async (user: User, accessTokenKey: string): Promise<Tokens> => {
    const accessToken = await JWT.encode(
        new JwtPayload(
            tokenInfo.issuer,
            tokenInfo.audience,
            user._id.toString(),
            accessTokenKey,
            tokenInfo.accessTokenValidity
        )
    )

    if (!accessToken) throw new InternalError()

    return {
        accessToken: accessToken
    } as Tokens
}
