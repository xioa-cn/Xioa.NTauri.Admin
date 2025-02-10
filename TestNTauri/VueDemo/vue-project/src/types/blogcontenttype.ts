
export interface ContentItem {
    type: string;
    title?: string;
    content?: string | any[];
    items?: any[];
    url?: string;
    text?: string;
    description?: string;
}

export interface BlogContent {
    type: string,
    title: string,
    content: any[];
}
