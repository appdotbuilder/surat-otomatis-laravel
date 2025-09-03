import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { OutgoingLetter, PaginatedData, LetterFilters } from '@/types/letter';

interface Props {
    letters: PaginatedData<OutgoingLetter>;
    filters: LetterFilters;
    isAdmin: boolean;
    [key: string]: unknown;
}

export default function OutgoingLettersIndex({ letters, filters, isAdmin }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [month, setMonth] = useState(filters.month || '');

    const handleSearch = () => {
        router.get(route('outgoing-letters.index'), {
            search: search || undefined,
            category: category || undefined,
            month: month || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setMonth('');
        router.get(route('outgoing-letters.index'));
    };

    const deleteLetter = (letter: OutgoingLetter) => {
        if (confirm(`Apakah Anda yakin ingin menghapus surat ${letter.full_number}?`)) {
            router.delete(route('outgoing-letters.destroy', letter.id));
        }
    };

    const getCategoryDisplay = (category: string) => {
        const displays: Record<string, string> = {
            ketua: 'Ketua PTUN',
            sekretaris: 'Sekretaris PTUN',
            panitera: 'Panitera PTUN',
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

    // Generate month options for the current and past years
    const monthOptions = [];
    const currentDate = new Date();
    for (let year = currentDate.getFullYear(); year >= 2020; year--) {
        const maxMonth = year === currentDate.getFullYear() ? currentDate.getMonth() + 1 : 12;
        for (let month = maxMonth; month >= 1; month--) {
            const value = `${year}-${month}`;
            const label = new Date(year, month - 1).toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long' 
            });
            monthOptions.push({ value, label });
        }
    }

    return (
        <AppShell>
            <Head title="Daftar Surat Keluar" />

            <div className="py-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">📄 Daftar Surat Keluar</h1>
                        <p className="text-gray-600">
                            {isAdmin ? 'Kelola semua surat keluar dalam sistem' : 'Daftar surat keluar yang Anda buat'}
                        </p>
                    </div>
                    <Link href={route('outgoing-letters.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            ➕ Buat Surat Baru
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <Input
                                    placeholder="🔍 Cari nomor, perihal, atau tujuan..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <div>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Kategori</SelectItem>
                                        <SelectItem value="ketua">Ketua PTUN</SelectItem>
                                        <SelectItem value="sekretaris">Sekretaris PTUN</SelectItem>
                                        <SelectItem value="panitera">Panitera PTUN</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select value={month} onValueChange={setMonth}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Semua Bulan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Bulan</SelectItem>
                                        {monthOptions.slice(0, 24).map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex space-x-2">
                                <Button onClick={handleSearch} variant="outline" className="flex-1">
                                    Filter
                                </Button>
                                <Button onClick={handleReset} variant="outline" className="flex-1">
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Letters Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Riwayat Surat ({letters.total})</span>
                            {letters.total > 0 && (
                                <Link href={route('reports.create')}>
                                    <Button variant="outline" size="sm">
                                        📊 Export Bulanan
                                    </Button>
                                </Link>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {letters.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">📭</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Surat</h3>
                                <p className="text-gray-600 mb-4">
                                    {filters.search || filters.category || filters.month 
                                        ? 'Tidak ada surat yang sesuai dengan filter yang dipilih.'
                                        : 'Mulai buat surat keluar pertama Anda.'}
                                </p>
                                <Link href={route('outgoing-letters.create')}>
                                    <Button>Buat Surat Baru</Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-2">Nomor Surat</th>
                                            <th className="text-left py-3 px-2">Perihal</th>
                                            <th className="text-left py-3 px-2">Tujuan</th>
                                            <th className="text-left py-3 px-2">Kategori</th>
                                            <th className="text-left py-3 px-2">Tanggal</th>
                                            {isAdmin && <th className="text-left py-3 px-2">Pembuat</th>}
                                            <th className="text-left py-3 px-2">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {letters.data.map((letter) => (
                                            <tr key={letter.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-2">
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                                        {letter.full_number}
                                                    </code>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="max-w-xs truncate" title={letter.subject}>
                                                        {letter.subject}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="max-w-xs truncate" title={letter.destination}>
                                                        {letter.destination}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2">
                                                    <Badge className={getCategoryColor(letter.category)}>
                                                        {getCategoryDisplay(letter.category)}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-2 text-sm text-gray-600">
                                                    {new Date(letter.letter_date).toLocaleDateString('id-ID')}
                                                </td>
                                                {isAdmin && (
                                                    <td className="py-3 px-2 text-sm text-gray-600">
                                                        {letter.user?.name}
                                                    </td>
                                                )}
                                                <td className="py-3 px-2">
                                                    <div className="flex space-x-2">
                                                        <Link href={route('outgoing-letters.show', letter.id)}>
                                                            <Button variant="outline" size="sm">
                                                                Detail
                                                            </Button>
                                                        </Link>
                                                        {isAdmin && (
                                                            <>
                                                                <Link href={route('outgoing-letters.edit', letter.id)}>
                                                                    <Button variant="outline" size="sm">
                                                                        Edit
                                                                    </Button>
                                                                </Link>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    onClick={() => deleteLetter(letter)}
                                                                >
                                                                    Hapus
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {letters.last_page > 1 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex space-x-2">
                                    {letters.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-2 text-sm rounded ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}