import express from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import { PublicRequest } from '../../types/app-request'
import { SuccessResponse } from '../../core/ApiResponse'
import NewsFeedRepo from '../../database/repository/NewsRepo'

const router = express.Router()

router.get(
    '/newsFeed',
    asyncHandler(async (req: PublicRequest, res) => {
        const newsFeeds = await NewsFeedRepo.getAllNewsFeed()
        const newsFeedResponse = newsFeeds.map((item) => {
            const news: {
                _id: string
                title: string
                description: string
                thumbnail: URL
                source: string
                publishedAt: Date | undefined
            }[] = item.news.map((nItem) => ({
                _id: nItem._id,
                title: nItem.title,
                description: nItem.description,
                thumbnail: nItem.thumbnail,
                source: nItem.source,
                publishedAt: nItem.createdAt
            }))

            return {
                header: item.header,
                layout: item.layout,
                news: news
            }
        })
        new SuccessResponse('Success', {
            newsFeed: newsFeedResponse
        }).send(res)
    })
)

router.post(
    '/create/news',
    asyncHandler(async (req: PublicRequest, res) => {
        const header = req.body.header as string
        const layout = req.body.layout as string
        const news = req.body.news
        const result = await NewsFeedRepo.createNewsFeed(news, header, layout)
        new SuccessResponse('Success', {
            result
        }).send(res)
    })
)

router.get(
    '/all',
    asyncHandler(async (req: PublicRequest, res) => {
        const newsFeeds = await NewsFeedRepo.getAllNewsFeed()
        const newsResponse = newsFeeds.map((item) => {
            return item.news
        })
        new SuccessResponse('Success', {
            news: newsResponse
        }).send(res)
    })
)

router.get(
    '/all',
    asyncHandler(async (req: PublicRequest, res) => {
        const newsFeeds = await NewsFeedRepo.getAllNewsFeed()
        const newsResponse = newsFeeds.map((item) => {
            return item.news
        })
        new SuccessResponse('Success', {
            news: newsResponse
        }).send(res)
    })
)

router.get(
    '/id/:id',
    asyncHandler(async (req, res) => {
        const news = await NewsFeedRepo.getNewsById(req.params.id)
        return new SuccessResponse('success', news).send(res)
    })
)

export default router
