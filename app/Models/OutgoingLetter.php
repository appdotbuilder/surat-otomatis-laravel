<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OutgoingLetter
 *
 * @property int $id
 * @property int $user_id
 * @property int $sequence_number
 * @property string $letter_code
 * @property string $subject
 * @property string $destination
 * @property \Illuminate\Support\Carbon $letter_date
 * @property string $category
 * @property string $full_number
 * @property int $year
 * @property int $month
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter query()
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereDestination($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereFullNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereLetterCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereLetterDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereSequenceNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OutgoingLetter whereYear($value)
 * @method static \Database\Factories\OutgoingLetterFactory factory($count = null, $state = [])
 *
 * @mixin \Eloquent
 */
class OutgoingLetter extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'sequence_number',
        'letter_code',
        'subject',
        'destination',
        'letter_date',
        'category',
        'full_number',
        'year',
        'month',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'letter_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the outgoing letter.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get category display name.
     *
     * @return string
     */
    public function getCategoryDisplayAttribute(): string
    {
        return match ($this->category) {
            'ketua' => 'Ketua PTUN Palembang',
            'sekretaris' => 'Sekretaris PTUN Palembang',
            'panitera' => 'Panitera PTUN Palembang',
            default => $this->category
        };
    }

    /**
     * Generate Roman numeral for month.
     *
     * @param int $month
     * @return string
     */
    public static function getRomanMonth(int $month): string
    {
        $romans = [
            1 => 'I', 2 => 'II', 3 => 'III', 4 => 'IV', 5 => 'V', 6 => 'VI',
            7 => 'VII', 8 => 'VIII', 9 => 'IX', 10 => 'X', 11 => 'XI', 12 => 'XII'
        ];

        return $romans[$month] ?? '';
    }

    /**
     * Generate the full letter number format.
     *
     * @param int $sequenceNumber
     * @param string $letterCode
     * @param int $month
     * @param int $year
     * @return string
     */
    public static function generateFullNumber(int $sequenceNumber, string $letterCode, int $month, int $year): string
    {
        $romanMonth = self::getRomanMonth($month);
        return sprintf('%d/%s/%s/%d', $sequenceNumber, $letterCode, $romanMonth, $year);
    }
}