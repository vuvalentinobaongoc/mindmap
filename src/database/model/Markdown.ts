import { UUID, randomUUID } from 'crypto';
import { result } from 'lodash';

import TurndownService from 'turndown';

export interface MarkDownnContent { 
    _id: UUID
    markdownContent: string
}

class MarkDownModel { 
    private turndownService = new TurndownService()
    createMarkDownContentFrom(content: string): MarkDownnContent { 

        const markdownContent = this.turndownService.turndown(
            content
        )
        const result: MarkDownnContent = {
            _id: randomUUID(),
            markdownContent: markdownContent
        }
        return result
    }
}

export const markdownModel = new MarkDownModel()

