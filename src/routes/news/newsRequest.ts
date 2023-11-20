export interface CreateNewRequest { 
    title: string
    description: string
    link: URL 
    thumbnail: URL
    source: string 
    author: string
    summary: string 
    content: string 
    categories: string[]
    tags: string[]
}