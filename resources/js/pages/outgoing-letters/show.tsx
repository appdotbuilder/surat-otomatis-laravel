import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { OutgoingLetter } from '@/types/letter';

interface Props {
    letter: OutgoingLetter;
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function ShowOutgoingLetter({ letter, isAdmin }: Props) {
    const deleteLetter = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus surat ${letter.full_number}?`)) {
            router.delete(route('outgoing-letters.destroy', letter.id));
        }
    };

    const getCategoryDisplay = (category: string) => {
        const displays: Record<string, string> = {
            ketua: 'Ketua PTUN Palembang',
            sekretaris: 'Sekretaris PTUN Palembang',
            panitera: 'Panitera PTUN Palembang',
        };
        return displays[category] || category;
    };

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            ketua: 'bg-blue-100 text-blue-800',
            sekretaris: 'bg-green-100 text-green-800',
            panitera: 'bg-purple-100 text-purple-800',
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppShell>
            <Head title={`Detail Surat ${letter.full_number}`} />

            <div className="py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('outgoing-letters.index'))}
                            className="mb-4"
                        >
                            ← Kembali ke Daftar Surat
                        </Button>
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    📄 Detail Surat Keluar
                                </h1>
                                <p className="text-gray-600">
                                    Informasi lengkap surat dengan nomor {letter.full_number}
                                </p>
                            </div>
                            {isAdmin && (
                                <div className="flex space-x-3">
                                    <Link href={route('outgoing-letters.edit', letter.id)}>
                                        <Button variant="outline">
                                            ✏️ Edit Surat
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        onClick={deleteLetter}
                                    >
                                        🗑️ Hapus Surat
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Main Letter Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>🔢</span>
                                    <span>Informasi Penomoran</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nomor Surat Lengkap</dt>
                                    <dd className="mt-1">
                                        <code className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg">
                                            {letter.full_number}
                                        </code>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Nomor Urut</dt>
                                    <dd className="mt-1 text-2xl font-bold text-blue-600">
                                        {letter.sequence_number}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Kode Surat</dt>
                                    <dd className="mt-1 font-mono text-lg">{letter.letter_code}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                                    <dd className="mt-1">
                                        <Badge className={getCategoryColor(letter.category)}>
                                            {getCategoryDisplay(letter.category)}
                                        </Badge>
                                    </dd>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Informasi Surat</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Perihal</dt>
                                    <dd className="mt-1 text-gray-900">{letter.subject}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tujuan</dt>
                                    <dd className="mt-1 text-gray-900">{letter.destination}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tanggal Surat</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {new Date(letter.letter_date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tahun/Bulan Penomoran</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {letter.year} / {new Date(letter.year, letter.month - 1).toLocaleDateString('id-ID', { month: 'long' })}
                                    </dd>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* System Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>ℹ️</span>
                                <span>Informasi Sistem</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {letter.user && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Dibuat Oleh</dt>
                                        <dd className="mt-1 text-gray-900">{letter.user.name}</dd>
                                        <dd className="text-sm text-gray-500">{letter.user.email}</dd>
                                    </div>
                                )}
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Tanggal Dibuat</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {new Date(letter.created_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Terakhir Diperbarui</dt>
                                    <dd className="mt-1 text-gray-900">
                                        {new Date(letter.updated_at).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">ID Sistem</dt>
                                    <dd className="mt-1 text-gray-900 font-mono">#{letter.id}</dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Format Explanation */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>📖</span>
                                <span>Penjelasan Format Nomor</span>
                            </CardTitle>
                            <CardDescription>
                                Breakdown komponen nomor surat sesuai standar PTUN Palembang
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="font-mono text-lg text-center mb-4 text-blue-900">
                                    {letter.full_number}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-blue-900 text-2xl">{letter.sequence_number}</div>
                                        <div className="text-blue-700">Nomor Urut</div>
                                        <div className="text-xs text-blue-600">Auto-generated</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-blue-900">{letter.letter_code}</div>
                                        <div className="text-blue-700">Kode Surat</div>
                                        <div className="text-xs text-blue-600">Input manual</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-blue-900 text-xl">
                                            {['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'][letter.month]}
                                        </div>
                                        <div className="text-blue-700">Bulan Romawi</div>
                                        <div className="text-xs text-blue-600">Auto dari tanggal</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-blue-900 text-xl">{letter.year}</div>
                                        <div className="text-blue-700">Tahun</div>
                                        <div className="text-xs text-blue-600">Auto dari tanggal</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}