<?php

namespace Database\Seeders;

use App\Models\OutgoingLetter;
use App\Models\User;
use App\Services\LetterNumberingService;
use Illuminate\Database\Seeder;

class OutgoingLetterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $letterService = app(LetterNumberingService::class);
        
        // Get or create some users
        $users = User::all();
        if ($users->count() === 0) {
            $users = User::factory()->count(3)->create();
        }

        // Create sample letters for different categories and time periods
        $categories = ['ketua', 'sekretaris', 'panitera'];
        $letterCodes = [
            'KPTUN.W5-TUN1/UND.01',
            'SPTUN.W5-TUN1/ADM.02',
            'PPTUN.W5-TUN1/REG.03',
            'KPTUN.W5-TUN1/KEP.04',
            'SPTUN.W5-TUN1/SRT.05',
        ];

        $subjects = [
            'Undangan Rapat Koordinasi',
            'Pemberitahuan Jadwal Persidangan',
            'Permohonan Data Statistik',
            'Surat Tugas Pegawai',
            'Laporan Kegiatan Bulanan',
            'Permohonan Izin Kegiatan',
            'Pemberitahuan Perpindahan Jadwal',
            'Surat Keterangan',
            'Undangan Sosialisasi',
            'Laporan Pertanggungjawaban',
        ];

        $destinations = [
            'Mahkamah Agung RI',
            'PTUN Jakarta',
            'PTUN Medan',
            'Pengadilan Negeri Palembang',
            'Kejaksaan Negeri Palembang',
            'Pemda Kota Palembang',
            'BPS Provinsi Sumatera Selatan',
            'Universitas Sriwijaya',
            'PT. Semen Baturaja',
            'Dinas Pendidikan Provinsi Sumsel',
        ];

        // Create letters for current year
        foreach ($categories as $category) {
            // Create 15-25 letters per category for current year
            $count = random_int(15, 25);
            for ($i = 0; $i < $count; $i++) {
                $letterService->createOutgoingLetter([
                    'letter_code' => fake()->randomElement($letterCodes),
                    'subject' => fake()->randomElement($subjects),
                    'destination' => fake()->randomElement($destinations),
                    'letter_date' => fake()->dateTimeBetween('first day of january this year', 'now'),
                    'category' => $category,
                ], $users->random()->id);
            }
        }

        // Create some letters for previous year
        foreach ($categories as $category) {
            $count = random_int(10, 20);
            for ($i = 0; $i < $count; $i++) {
                $letterService->createOutgoingLetter([
                    'letter_code' => fake()->randomElement($letterCodes),
                    'subject' => fake()->randomElement($subjects),
                    'destination' => fake()->randomElement($destinations),
                    'letter_date' => fake()->dateTimeBetween('first day of january last year', 'last day of december last year'),
                    'category' => $category,
                ], $users->random()->id);
            }
        }
    }
}