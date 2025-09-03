<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        \App\Models\User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@ptun-palembang.go.id',
            'role' => 'admin',
        ]);

        // Create regular users
        \App\Models\User::factory()->count(5)->create([
            'role' => 'user',
        ]);

        // Create sample outgoing letters
        $this->call([
            OutgoingLetterSeeder::class,
        ]);
    }
}
