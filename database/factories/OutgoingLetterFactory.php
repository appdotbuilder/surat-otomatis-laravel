<?php

namespace Database\Factories;

use App\Models\OutgoingLetter;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OutgoingLetter>
 */
class OutgoingLetterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $letterDate = fake()->dateTimeBetween('-2 years', 'now');
        $year = $letterDate->format('Y');
        $month = $letterDate->format('n');
        $category = fake()->randomElement(['ketua', 'sekretaris', 'panitera']);
        $letterCode = fake()->randomElement([
            'KPTUN.W5-TUN1/UND.01',
            'SPTUN.W5-TUN1/ADM.02',
            'PPTUN.W5-TUN1/REG.03',
            'KPTUN.W5-TUN1/KEP.04',
            'SPTUN.W5-TUN1/SRT.05',
        ]);

        return [
            'user_id' => User::factory(),
            'sequence_number' => fake()->numberBetween(1, 999),
            'letter_code' => $letterCode,
            'subject' => fake()->sentence(6),
            'destination' => fake()->company(),
            'letter_date' => $letterDate,
            'category' => $category,
            'full_number' => function (array $attributes) {
                return OutgoingLetter::generateFullNumber(
                    $attributes['sequence_number'],
                    $attributes['letter_code'],
                    Carbon::parse($attributes['letter_date'])->month,
                    Carbon::parse($attributes['letter_date'])->year
                );
            },
            'year' => $year,
            'month' => $month,
        ];
    }

    /**
     * Indicate that the letter is from this year.
     */
    public function thisYear(): static
    {
        return $this->state(fn (array $attributes) => [
            'letter_date' => fake()->dateTimeBetween('first day of january this year', 'now'),
            'year' => now()->year,
            'month' => fake()->numberBetween(1, now()->month),
        ]);
    }

    /**
     * Indicate that the letter is from a specific category.
     */
    public function category(string $category): static
    {
        return $this->state(fn (array $attributes) => [
            'category' => $category,
        ]);
    }
}