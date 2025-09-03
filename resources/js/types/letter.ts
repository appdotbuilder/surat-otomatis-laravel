export interface OutgoingLetter {
    id: number;
    user_id: number;
    sequence_number: number;
    letter_code: string;
    subject: string;
    destination: string;
    letter_date: string;
    category: 'ketua' | 'sekretaris' | 'panitera';
    full_number: string;
    year: number;
    month: number;
    created_at: string;
    updated_at: string;
    user?: User;
    category_display?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: 'admin' | 'user';
    created_at: string;
    updated_at: string;
    outgoing_letters_count?: number;
    outgoing_letters?: OutgoingLetter[];
}

export interface LetterFormData {
    letter_code: string;
    subject: string;
    destination: string;
    letter_date: string;
    category: 'ketua' | 'sekretaris' | 'panitera';
}

export interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'admin' | 'user';
    [key: string]: unknown;
}

export interface LetterFilters {
    search?: string;
    category?: string;
    month?: string;
}

export interface DashboardStats {
    totalLetters: number;
    monthlyLetters: number;
    totalUsers?: number;
    categoryStats: {
        ketua: number;
        sekretaris: number;
        panitera: number;
    };
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}