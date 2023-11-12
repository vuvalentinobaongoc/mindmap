import { Role, RoleCode } from './Role'
import bcrypt from 'bcrypt'
import { UUID, randomUUID } from 'crypto';

export default interface User {
    _id: UUID
    name?: string
    email?: string
    password?: string
    roles: Role[]
    createdAt?: Date
    updatedAt?: Date
}

class UserModel {
    private users: User[] = []

    constructor() {
        const adminRole: Role = {
            _id: randomUUID(),
            code: RoleCode.ADMIN,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        // Add default users
        const admin: User = {
            _id: randomUUID(),
            name: 'Admin',
            email: 'valentinobaongoc@gmail.com',
            password: "LineDev@123",
            roles: [
                adminRole
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.users.push(admin)
    }

    addUser(user: User): User {
        this.users.push(user)
        return user
    }

    findUserById(id: string): User | undefined {
        return this.users.find((user) => user._id === id)
    }

    findUserByEmail(email: string): User | undefined {
        return this.users.find((user) => user.email === email)
    }
}

export const userModel = new UserModel()
