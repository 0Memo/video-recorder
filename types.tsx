export interface VideoCardProps {
    id: string;
    title: string;
    thumbnail: string;
    userImg: string;
    username: string;
    createdAt: Date;
    views: number;
    visibility: "public" | "private";
    duration: number | null;
}