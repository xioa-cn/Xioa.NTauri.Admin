export interface BlogPost {
    id: number;
    title: string;
    date: string;
    views?: number;
    comments?: number;
    likes?: number;
    category?: string;
    tags?: string[];
    image?: string;
    subtitle?: string;
    viewCount?: number;
    coverImage?: string;
}