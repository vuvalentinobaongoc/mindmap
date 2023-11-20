import { UUID, randomUUID } from 'crypto';
import { MarkDownnContent } from './Markdown';
export interface News {
    _id: UUID
    title: string
    description: string
    link: URL
    thumbnail: URL
    source: string
    author: string
    summary: string
    content: MarkDownnContent
    category: string[]
    tags: string[]
    createdAt?: Date
}

