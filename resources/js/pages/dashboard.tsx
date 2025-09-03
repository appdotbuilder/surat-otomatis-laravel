import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { OutgoingLetter, DashboardStats } from '@/types/letter';
import { type BreadcrumbItem } from '@/types';

interface Props {
    stats: DashboardStats;
    recentLetters: OutgoingLetter[];
    isAdmin: boolean;
    currentYear: number;
    currentMonth: number;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, recentLetters, isAdmin, currentYear, currentMonth }: Props) {
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

    const monthName = new Date(currentYear, currentMonth - 1).toLocaleDateString('id-ID', { month: 'long' });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard PTUN Palembang" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        🏛️ Dashboard PTUN Palembang
                    </h1>
                    <p className="text-gray-600">
                        {isAdmin ? 'Kelola sistem penomoran surat keluar' : 'Lihat aktivitas surat keluar Anda'}
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Surat</CardTitle>
                            <span className="text-2xl">📄</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.totalLetters}</div>
                            <p className="text-xs text-muted-foreground">
                                {isAdmin ? 'Seluruh sistem' : 'Surat Anda'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
                            <span className="text-2xl">📅</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.monthlyLetters}</div>
                            <p className="text-xs text-muted-foreground">
                                {monthName} {currentYear}
                            </p>
                        </CardContent>
                    </Card>

                    {isAdmin && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Pengguna</CardTitle>
                                <span className="text-2xl">👥</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-600">{stats.totalUsers}</div>
                                <p className="text-xs text-muted-foreground">
                                    Admin & User aktif
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kategori Terbanyak</CardTitle>
                            <span className="text-2xl">📊</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {Math.max(stats.categoryStats.ketua, stats.categoryStats.sekretaris, stats.categoryStats.panitera)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Tahun {currentYear}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Statistics */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <span>📈</span>
                            <span>Statistik Kategori {currentYear}</span>
                        </CardTitle>
                        <CardDescription>
                            Jumlah surat yang telah diproses per kategori pada tahun berjalan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <div className="text-3xl mb-2">👨‍💼</div>
                                <h4 className="font-semibold text-lg mb-2">Ketua PTUN</h4>
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {stats.categoryStats.ketua}
                                </div>
                                <p className="text-sm text-blue-700">surat keluar</p>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-lg">
                                <div className="text-3xl mb-2">📋</div>
                                <h4 className="font-semibold text-lg mb-2">Sekretaris PTUN</h4>
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {stats.categoryStats.sekretaris}
                                </div>
                                <p className="text-sm text-green-700">surat keluar</p>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-3xl mb-2">⚖️</div>
                                <h4 className="font-semibold text-lg mb-2">Panitera PTUN</h4>
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {stats.categoryStats.panitera}
                                </div>
                                <p className="text-sm text-purple-700">surat keluar</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions and Recent Letters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Letters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span className="flex items-center space-x-2">
                                    <span>📋</span>
                                    <span>Surat Terbaru</span>
                                </span>
                                <Link href={route('outgoing-letters.index')}>
                                    <Button variant="outline" size="sm">
                                        Lihat Semua
                                    </Button>
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentLetters.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">📭</div>
                                    <p className="text-gray-500 mb-4">Belum ada surat yang dibuat</p>
                                    <Link href={route('outgoing-letters.create')}>
                                        <Button size="sm">Buat Surat Pertama</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentLetters.map((letter) => (
                                        <div key={letter.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                                                        {letter.full_number}
                                                    </code>
                                                    <Badge className={getCategoryColor(letter.category)} variant="secondary">
                                                        {getCategoryDisplay(letter.category)}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {letter.subject}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(letter.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <Link href={route('outgoing-letters.show', letter.id)}>
                                                <Button variant="outline" size="sm">
                                                    Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span>⚡</span>
                                <span>Aksi Cepat</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Link href={route('outgoing-letters.create')} className="block">
                                    <div className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">➕</span>
                                            <div>
                                                <h4 className="font-semibold text-blue-900">Buat Surat Baru</h4>
                                                <p className="text-sm text-blue-700">Generate nomor surat keluar otomatis</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href={route('outgoing-letters.index')} className="block">
                                    <div className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">📄</span>
                                            <div>
                                                <h4 className="font-semibold text-green-900">Lihat Semua Surat</h4>
                                                <p className="text-sm text-green-700">Kelola dan cari riwayat surat</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                {isAdmin && (
                                    <Link href={route('users.index')} className="block">
                                        <div className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl">👥</span>
                                                <div>
                                                    <h4 className="font-semibold text-purple-900">Kelola Pengguna</h4>
                                                    <p className="text-sm text-purple-700">Tambah dan edit pengguna sistem</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                <Link href={route('reports.create')} className="block">
                                    <div className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">📊</span>
                                            <div>
                                                <h4 className="font-semibold text-orange-900">Export Laporan</h4>
                                                <p className="text-sm text-orange-700">Unduh laporan bulanan</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}