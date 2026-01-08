/**
 * TaskEntity - Bu bazadagi 'tasks' jadvalining nusxasi.
 * Har bir qator mana shu strukturada saqlanadi.
 */
export interface TaskEntity {
    id?: number;          // Avtomatik oshib boruvchi ID (Optional, chunki yaratishda hali bo'lmaydi)
    title: string;        // Vazifa sarlavhasi
    description: string;  // Vazifa haqida batafsil
    is_completed: number; // SQLite-da boolean yo'q, shuning uchun 0 yoki 1 ishlatamiz
    created_at: string;   // Yaratilgan sana (ISO string)
}