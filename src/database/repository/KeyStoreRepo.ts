import { Keystore, keyStoreModel } from '../model/Keystore';
import User from '../model/User';
import { UUID, randomUUID } from 'crypto';

async function findforKey(client: User, key: string): Promise<Keystore | undefined> {
    return keyStoreModel.findKeystoreByClientAndKeys(client, key)
}

async function remove(id: string): Promise<void | null> {
    return keyStoreModel.remmoveKeystoreById(id)
}

async function create(
  client: User,
  primaryKey: string
): Promise<Keystore> {
    const newKeyStore: Keystore = { 
        _id: randomUUID(),
        client: client,
        primaryKey: primaryKey,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    return keyStoreModel.addKeystore(
       newKeyStore
    )
}

export default {
  findforKey,
  remove,
  create,
};