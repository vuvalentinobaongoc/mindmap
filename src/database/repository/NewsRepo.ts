import { NewsFeed, newsFeedModel } from '../model/NewsFeed';
import { News } from '../model/News';
import { CreateNewRequest } from '../../routes/news/newsRequest'

async function getNewsFeedById(id: string): Promise<NewsFeed | undefined> {
    return newsFeedModel.findFeedById(id)
}

async function getNewsById(id: string): Promise<News | undefined> { 
    return newsFeedModel.findNewsById(id)
}

async function getAllNewsFeed(): Promise<NewsFeed[]> {
    return newsFeedModel.getNewsFeed()
}

async function createNewsFeed(createNewsRequests: CreateNewRequest[], header: string, layout: string): Promise<{ newsFeed: NewsFeed }> {
    const transformedNews: News[] = createNewsRequests.map((item) => newsFeedModel.createNews(item))
    const createdNewsFeed = newsFeedModel.addNews(transformedNews, header, layout)
    return {
        newsFeed: createdNewsFeed
    }
}

export default {
    getNewsFeedById,
    getAllNewsFeed,
    createNewsFeed,
    getNewsById
}
