export interface LeaveMessage {
    id: number;
    content: string;
    avatar: string;
    username: string;
    date: string;
    top?: number
    duration?: number
}