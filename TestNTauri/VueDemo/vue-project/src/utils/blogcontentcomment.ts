import type { Comment } from '@/types/blogcommentareatype'

export const commentsdata: Comment[] = [
    {
        id: 1,
        avatar: '/2.jpg',
        username: 'Dalao',
        date: '2025-01-05',
        content: '好！更新的挺快，很实用！',
        tags: ['VIP']
    },
    {
        id: 2,

        avatar: '/2.jpg',
        username: 'Sara',
        date: '2025-01-05',
        content: '感谢分享，学习了！',
        tags: ['VIP']
    },
    {
        id: 3,
        avatar: '/2.jpg',
        username: 'John',
        date: '2025-01-04',
        content: '写得很详细，对新手很友好',
        tags: ['NOR']
    },
    {
        id: 4,


        avatar: '/2.jpg',
        username: 'Alice',
        date: '2025-01-04',
        content: '期待更多更新！',
        tags: ['VIP']
    },
    {
        id: 5,
        avatar: '/2.jpg',
        username: 'Bob',
        date: '2025-01-03',
        content: '这个教程太棒了！',
        tags: ['SVIP']
    }
]