import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';



export default function Welcome() {
    const { auth } = usePage<{ auth: { user: User | null } }>().props;

    const features = [
        {
            icon: '🔢',
            title: 'Penomoran Otomatis',
            description: 'Sistem generate nomor surat unik secara otomatis dengan format standar PTUN'
        },
        {
            icon: '📅',
            title: 'Reset Tahunan',
            description: 'Nomor urut akan direset ke 1 setiap awal tahun untuk setiap kategori penomoran'
        },
        {
            icon: '📋',
            title: 'Tiga Kategori',
            description: 'Penomoran terpisah untuk Ketua, Sekretaris, dan Panitera PTUN Palembang'
        },
        {
            icon: '📊',
            title: 'Laporan & Riwayat',
            description: 'Tabel riwayat interaktif dengan fitur pencarian dan filter bulanan'
        },
        {
            icon: '👥',
            title: 'Manajemen Pengguna',
            description: 'Sistem peran admin dan user dengan kontrol akses yang ketat'
        },
        {
            icon: '📄',
            title: 'Export Laporan',
            description: 'Unduh laporan bulanan dalam format yang siap pakai'
        }
    ];

    const sampleNumbers = [
        '789/KPTUN.W5-TUN1/UND.01/VIII/2025',
        '156/SPTUN.W5-TUN1/ADM.02/VII/2025',
        '423/PPTUN.W5-TUN1/REG.03/VI/2025'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">📄</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">PTUN Palembang</h1>
                                <p className="text-sm text-gray-600">Sistem Penomoran Surat Keluar</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">
                                        Welcome, {auth.user.name}
                                    </span>
                                    <Link href={route('dashboard')}>
                                        <Button>Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href={route('login')}>
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button>Daftar</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        🏛️ Sistem Otomatisasi Penomoran Surat Keluar
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Solusi digital modern untuk pengelolaan dan penomoran surat keluar 
                        Pengadilan Tata Usaha Negara Palembang dengan sistem yang efisien dan akurat.
                    </p>
                    
                    {/* Sample Letter Numbers */}
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Contoh Format Nomor Surat:
                        </h3>
                        <div className="space-y-2">
                            {sampleNumbers.map((number, index) => (
                                <div key={index} className="font-mono text-lg text-blue-600 bg-blue-50 p-3 rounded">
                                    {number}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            Format: [Nomor Urut]/[Kode Surat]/[Bulan Romawi]/[Tahun]
                        </p>
                    </div>

                    {!auth.user && (
                        <div className="flex justify-center space-x-4">
                            <Link href={route('register')}>
                                <Button size="lg" className="px-8 py-3">
                                    🚀 Mulai Sekarang
                                </Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="outline" size="lg" className="px-8 py-3">
                                    📋 Login Demo
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-3xl mb-2">{feature.icon}</div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Categories Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        📂 Kategori Penomoran Surat
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <div className="text-3xl mb-3">👨‍💼</div>
                            <h4 className="font-semibold text-lg mb-2">Ketua PTUN</h4>
                            <p className="text-gray-600">Surat keputusan dan kebijakan strategis</p>
                            <Badge variant="secondary" className="mt-2">Kategori: ketua</Badge>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-lg">
                            <div className="text-3xl mb-3">📋</div>
                            <h4 className="font-semibold text-lg mb-2">Sekretaris PTUN</h4>
                            <p className="text-gray-600">Surat administrasi dan operasional</p>
                            <Badge variant="secondary" className="mt-2">Kategori: sekretaris</Badge>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-lg">
                            <div className="text-3xl mb-3">⚖️</div>
                            <h4 className="font-semibold text-lg mb-2">Panitera PTUN</h4>
                            <p className="text-gray-600">Surat registrasi dan persidangan</p>
                            <Badge variant="secondary" className="mt-2">Kategori: panitera</Badge>
                        </div>
                    </div>
                </div>

                {/* Demo Credentials */}
                {!auth.user && (
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8 border border-amber-200">
                        <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
                            🔑 Kredensial Demo
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Admin Demo:</h4>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin@ptun-palembang.go.id</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">password</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-2">Akses penuh untuk mengelola pengguna dan surat</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Fitur Admin:</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Kelola semua pengguna</li>
                                    <li>• Edit & hapus surat</li>
                                    <li>• Lihat semua riwayat</li>
                                    <li>• Export laporan bulanan</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2025 PTUN Palembang. Sistem Penomoran Surat Keluar.</p>
                        <p className="text-sm mt-2">Dibangun dengan Laravel, React & PostgreSQL</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}