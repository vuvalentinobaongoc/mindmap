export const DOCUMENT_NAME = 'ApiKey'
export const COLLECTION_NAME = 'api_keys'

export enum Permission {
    GENERAL = 'GENERAL'
}

export interface ApiKey {
    _id: string
    key: string
    version: number
    permissions: Permission[]
    comments: string[]
    status: boolean
    createdAt: Date
    updatedAt: Date
}

class ApiKeyStore {
    private apiKeys: ApiKey[] = []

    addApiKey(apiKey: ApiKey): void {
        this.apiKeys.push(apiKey)
    }

    getApiKeys(): ApiKey[] {
        return this.apiKeys
    }

    findApiKeyById(id: string): ApiKey | undefined {
        return this.apiKeys.find((apiKey) => apiKey._id === id)
    }

    findApiKeyByKey(key: string): ApiKey | undefined {
        return this.apiKeys.find((apiKey) => apiKey.key === key)
    }
}

export const apiKeyStore = new ApiKeyStore()
