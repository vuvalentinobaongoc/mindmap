import { UUID } from "crypto"
export const DOCUMENT_NAME = 'Role'
export const COLLECTION_NAME = 'roles'

export enum RoleCode {
    ADMIN = 'ADMIN'
}

export interface Role {
    _id: UUID
    code: string
    status: boolean
    createdAt: Date
    updatedAt: Date
}

class RoleModel {
    private roles: Role[] = []

    addRole(role: Role): void {
        this.roles.push(role)
    }

    getRoles(): Role[] {
        return this.roles
    }

    findRoleById(id: string): Role | undefined {
        return this.roles.find((role) => role._id === id)
    }

    findRoleByCode(code: string): Role | undefined {
        return this.roles.find((role) => role.code === code)
    }
}

export const roleModel = new RoleModel()
