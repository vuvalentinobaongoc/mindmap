import User, { userModel } from '../model/User'
import { roleModel } from '../model/Role'
import { Keystore, keyStoreModel } from '../model/Keystore'
import { InternalError } from '../../core/ApiError'
import KeyStoreRepo from './KeyStoreRepo'
import { UUID } from 'crypto'

async function exists(id: UUID): Promise<boolean> {
    const user = userModel.findUserById(id)
    return user !== null && user !== undefined
}

async function findById(id: UUID): Promise<User | undefined> {
    return userModel.findUserById(id)
}

async function findByEmail(email: string): Promise<User | undefined> {
    return userModel.findUserByEmail(email)
}

async function create(
    user: User,
    accessTokenKey: string,
    roleCode: string
): Promise<{ user: User; keystore: Keystore }> {
    const role = roleModel.findRoleByCode(roleCode)
    if (!role) throw new InternalError('Role must be defined')
    user.roles = [role]
    user.createdAt = user.updatedAt = new Date()
    const createdUser = userModel.addUser(user)
    const keyStore = await KeyStoreRepo.create(createdUser, accessTokenKey)
    return {
        user: createdUser,
        keystore: keyStore
    }
}

export default {
    exists,
    findById,
    findByEmail,
    create
}
