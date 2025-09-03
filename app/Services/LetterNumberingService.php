<?php

namespace App\Services;

use App\Models\OutgoingLetter;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LetterNumberingService
{
    /**
     * Generate the next sequence number for a given category and year.
     *
     * @param string $category
     * @param int $year
     * @return int
     */
    public function getNextSequenceNumber(string $category, int $year): int
    {
        $lastLetter = OutgoingLetter::where('category', $category)
            ->where('year', $year)
            ->orderBy('sequence_number', 'desc')
            ->first();

        return $lastLetter ? $lastLetter->sequence_number + 1 : 1;
    }

    /**
     * Create a new outgoing letter with automatic numbering.
     *
     * @param array $data
     * @param int $userId
     * @return OutgoingLetter
     */
    public function createOutgoingLetter(array $data, int $userId): OutgoingLetter
    {
        return DB::transaction(function () use ($data, $userId) {
            $letterDate = Carbon::parse($data['letter_date']);
            $year = $letterDate->year;
            $month = $letterDate->month;

            // Get the next sequence number for this category and year
            $sequenceNumber = $this->getNextSequenceNumber($data['category'], $year);

            // Generate the full letter number
            $fullNumber = OutgoingLetter::generateFullNumber(
                $sequenceNumber,
                $data['letter_code'],
                $month,
                $year
            );

            // Create the outgoing letter
            return OutgoingLetter::create([
                'user_id' => $userId,
                'sequence_number' => $sequenceNumber,
                'letter_code' => $data['letter_code'],
                'subject' => $data['subject'],
                'destination' => $data['destination'],
                'letter_date' => $letterDate,
                'category' => $data['category'],
                'full_number' => $fullNumber,
                'year' => $year,
                'month' => $month,
            ]);
        });
    }

    /**
     * Update an existing outgoing letter with recalculated numbering if needed.
     *
     * @param OutgoingLetter $letter
     * @param array $data
     * @return OutgoingLetter
     */
    public function updateOutgoingLetter(OutgoingLetter $letter, array $data): OutgoingLetter
    {
        return DB::transaction(function () use ($letter, $data) {
            $letterDate = Carbon::parse($data['letter_date']);
            $newYear = $letterDate->year;
            $newMonth = $letterDate->month;

            // Check if category or year changed, which might require renumbering
            $categoryChanged = $letter->category !== $data['category'];
            $yearChanged = $letter->year !== $newYear;

            if ($categoryChanged || $yearChanged) {
                // Get new sequence number for the new category/year combination
                $sequenceNumber = $this->getNextSequenceNumber($data['category'], $newYear);
            } else {
                // Keep the same sequence number
                $sequenceNumber = $letter->sequence_number;
            }

            // Generate new full number
            $fullNumber = OutgoingLetter::generateFullNumber(
                $sequenceNumber,
                $data['letter_code'],
                $newMonth,
                $newYear
            );

            // Update the letter
            $letter->update([
                'sequence_number' => $sequenceNumber,
                'letter_code' => $data['letter_code'],
                'subject' => $data['subject'],
                'destination' => $data['destination'],
                'letter_date' => $letterDate,
                'category' => $data['category'],
                'full_number' => $fullNumber,
                'year' => $newYear,
                'month' => $newMonth,
            ]);

            return $letter->fresh();
        });
    }

    /**
     * Get monthly statistics for reporting.
     *
     * @param int $year
     * @param int $month
     * @return array
     */
    public function getMonthlyStatistics(int $year, int $month): array
    {
        $letters = OutgoingLetter::where('year', $year)
            ->where('month', $month)
            ->get();

        $stats = [
            'total' => $letters->count(),
            'by_category' => [
                'ketua' => $letters->where('category', 'ketua')->count(),
                'sekretaris' => $letters->where('category', 'sekretaris')->count(),
                'panitera' => $letters->where('category', 'panitera')->count(),
            ],
        ];

        return $stats;
    }
}