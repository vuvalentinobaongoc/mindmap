import { UUID, randomUUID } from 'crypto'
import { News } from './News'
import { CreateNewRequest } from '../../routes/news/newsRequest'
import { MarkDownnContent, markdownModel } from './Markdown'
export interface NewsFeed {
    _id: UUID
    header: string
    layout: string
    news: News[]
}

class NewsFeedModel {
    private newsFeed: NewsFeed[] = []
    constructor() {}

    addNews(news: News[], header: string, layout: string): NewsFeed {
        const newsFeed = {
            _id: randomUUID(),
            header,
            layout,
            news
        }
        this.newsFeed.push(newsFeed)
        return newsFeed
    }

    createNews(newRequest: CreateNewRequest): News {
        const markDownContent: MarkDownnContent = markdownModel.createMarkDownContentFrom(newRequest.content)
        const newNews: News = {
            _id: randomUUID(),
            title: newRequest.title,
            description: newRequest.description,
            link: newRequest.link,
            thumbnail: newRequest.thumbnail,
            source: newRequest.source,
            author: newRequest.author,
            summary: newRequest.summary,
            content: markDownContent,
            category: newRequest.categories,
            tags: newRequest.tags,
            createdAt: new Date()
        }
        return newNews
    }

    findFeedById(id: string): NewsFeed | undefined {
        return this.newsFeed.find((item) => item._id === id)
    }

    findNewsById(id: string): News | undefined { 
        for (let i = 0; i < this.newsFeed.length; i++) { 
            let newsFeed = this.newsFeed[i]
            const found = newsFeed.news.find(obj => { 
                return obj._id == id
            }) 
            if (found != undefined) { 
                return found
            }
        }
        return undefined
    }

    getNewsFeed(): NewsFeed[] {
        return this.newsFeed
    }
}

export const newsFeedModel = new NewsFeedModel()
