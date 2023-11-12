import User from "./User"
import { UUID } from "crypto"
export const DOCUMENT_NAME = 'Keystore'
export const COLLECTION_NAME = 'keystores'

export interface Keystore {
    _id: UUID
    client: User
    primaryKey: string
    status: boolean
    createdAt: Date
    updatedAt: Date
}

class KeyStoreModel {
    private keystores: Keystore[] = []

    addKeystore(keystore: Keystore): Keystore {
        this.keystores.push(keystore)
        return keystore
    }

    remmoveKeystoreById(id: string) { 
        this.keystores = this.keystores.filter((keyStore) => keyStore._id !== id)
    }

    findKeystoreById(id: string): Keystore | undefined {
        return this.keystores.find((keystore) => keystore._id === id)
    }

    findKeystoreByClientAndKeys(client: User, primaryKey: string): Keystore | undefined {
        return this.keystores.find(
            (keystore) =>
                keystore.client === client &&
                keystore.primaryKey === primaryKey
        )
    }
}

export const keyStoreModel = new KeyStoreModel()
