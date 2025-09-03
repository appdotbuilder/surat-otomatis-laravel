<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\OutgoingLetter;
use App\Models\User;
use App\Services\LetterNumberingService;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * The letter numbering service instance.
     */
    protected LetterNumberingService $letterService;

    /**
     * Create a new controller instance.
     */
    public function __construct(LetterNumberingService $letterService)
    {
        $this->letterService = $letterService;
    }

    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        // Get basic statistics
        if ($user->isAdmin()) {
            $totalLetters = OutgoingLetter::count();
            $monthlyLetters = OutgoingLetter::where('year', $currentYear)
                ->where('month', $currentMonth)
                ->count();
            $totalUsers = User::count();
            
            // Recent letters (admin sees all)
            $recentLetters = OutgoingLetter::with('user')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
        } else {
            $totalLetters = OutgoingLetter::where('user_id', $user->id)->count();
            $monthlyLetters = OutgoingLetter::where('user_id', $user->id)
                ->where('year', $currentYear)
                ->where('month', $currentMonth)
                ->count();
            $totalUsers = null; // Regular users don't see user count
            
            // Recent letters (user sees only their own)
            $recentLetters = OutgoingLetter::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();
        }

        // Category statistics for current year
        $categoryStats = [
            'ketua' => OutgoingLetter::where('category', 'ketua')
                ->where('year', $currentYear)
                ->count(),
            'sekretaris' => OutgoingLetter::where('category', 'sekretaris')
                ->where('year', $currentYear)
                ->count(),
            'panitera' => OutgoingLetter::where('category', 'panitera')
                ->where('year', $currentYear)
                ->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => [
                'totalLetters' => $totalLetters,
                'monthlyLetters' => $monthlyLetters,
                'totalUsers' => $totalUsers,
                'categoryStats' => $categoryStats,
            ],
            'recentLetters' => $recentLetters,
            'isAdmin' => $user->isAdmin(),
            'currentYear' => $currentYear,
            'currentMonth' => $currentMonth,
        ]);
    }
}