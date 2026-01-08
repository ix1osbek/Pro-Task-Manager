/**
 * TaskDto - Frontend ko'radigan ma'lumot formati.
 */
export interface TaskDto {
    id: number;
    title: string;
    description: string;
    completed: boolean; // Frontend uchun boolean qulayroq
    createdAt: string;
}