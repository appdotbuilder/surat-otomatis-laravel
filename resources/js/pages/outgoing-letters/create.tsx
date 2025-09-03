import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Surat Keluar',
        href: '/outgoing-letters',
    },
    {
        title: 'Buat Baru',
        href: '/outgoing-letters/create',
    },
];

export default function CreateOutgoingLetter() {
    const { data, setData, post, processing, errors } = useForm({
        letter_code: '',
        subject: '',
        destination: '',
        letter_date: new Date().toISOString().split('T')[0],
        category: 'ketua',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('outgoing-letters.store'));
    };

    const categoryOptions = [
        { value: 'ketua', label: 'Ketua PTUN Palembang' },
        { value: 'sekretaris', label: 'Sekretaris PTUN Palembang' },
        { value: 'panitera', label: 'Panitera PTUN Palembang' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Nomor Surat Baru" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={() => router.visit(route('outgoing-letters.index'))}
                        className="mb-4"
                    >
                        ← Kembali ke Daftar Surat
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">📝 Buat Nomor Surat Baru</h1>
                    <p className="text-gray-600">
                        Isi formulir di bawah untuk membuat nomor surat keluar baru dengan penomoran otomatis.
                    </p>
                </div>

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Formulir Surat Keluar</CardTitle>
                            <CardDescription>
                                Sistem akan otomatis generate nomor urut berdasarkan kategori dan tahun yang dipilih.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori Surat *</Label>
                                    <Select value={data.category} onValueChange={(value: string) => setData('category', value as 'ketua' | 'sekretaris' | 'panitera')}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kategori surat" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.category} />
                                </div>

                                {/* Letter Code */}
                                <div className="space-y-2">
                                    <Label htmlFor="letter_code">Kode Surat *</Label>
                                    <Input
                                        id="letter_code"
                                        type="text"
                                        value={data.letter_code}
                                        onChange={(e) => setData('letter_code', e.target.value)}
                                        placeholder="Contoh: KPTUN.W5-TUN1/UND.01"
                                        className="font-mono"
                                    />
                                    <InputError message={errors.letter_code} />
                                    <p className="text-sm text-gray-500">
                                        Masukkan kode surat sesuai jenis dan klasifikasi surat
                                    </p>
                                </div>

                                {/* Subject */}
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Perihal Surat *</Label>
                                    <Textarea
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Masukkan perihal atau subjek surat"
                                        rows={3}
                                    />
                                    <InputError message={errors.subject} />
                                </div>

                                {/* Destination */}
                                <div className="space-y-2">
                                    <Label htmlFor="destination">Tujuan Surat *</Label>
                                    <Input
                                        id="destination"
                                        type="text"
                                        value={data.destination}
                                        onChange={(e) => setData('destination', e.target.value)}
                                        placeholder="Masukkan tujuan/penerima surat"
                                    />
                                    <InputError message={errors.destination} />
                                </div>

                                {/* Letter Date */}
                                <div className="space-y-2">
                                    <Label htmlFor="letter_date">Tanggal Surat *</Label>
                                    <Input
                                        id="letter_date"
                                        type="date"
                                        value={data.letter_date}
                                        onChange={(e) => setData('letter_date', e.target.value)}
                                    />
                                    <InputError message={errors.letter_date} />
                                    <p className="text-sm text-gray-500">
                                        Bulan dan tahun akan diekstrak otomatis untuk penomoran
                                    </p>
                                </div>

                                {/* Format Preview */}
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">Preview Format Nomor:</h4>
                                    <div className="font-mono text-blue-700 bg-white p-2 rounded border">
                                        [Nomor Urut Otomatis]/{data.letter_code || '[Kode Surat]'}/[Bulan Romawi]/[Tahun]
                                    </div>
                                    <p className="text-sm text-blue-600 mt-2">
                                        Nomor urut akan digenerate otomatis berdasarkan kategori dan tahun yang dipilih
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.visit(route('outgoing-letters.index'))}
                                        disabled={processing}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? '⏳ Memproses...' : '🚀 Buat Nomor Surat'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}