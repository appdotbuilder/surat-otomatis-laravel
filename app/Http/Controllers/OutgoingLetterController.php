<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOutgoingLetterRequest;
use App\Http\Requests\UpdateOutgoingLetterRequest;
use App\Models\OutgoingLetter;
use App\Services\LetterNumberingService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class OutgoingLetterController extends Controller
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = OutgoingLetter::with('user');

        // For non-admin users, only show their own letters
        if (!auth()->user()->isAdmin()) {
            $query->where('user_id', auth()->id());
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_number', 'like', '%' . $search . '%')
                  ->orWhere('subject', 'like', '%' . $search . '%')
                  ->orWhere('destination', 'like', '%' . $search . '%')
                  ->orWhere('letter_code', 'like', '%' . $search . '%');
            });
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        // Filter by month/year
        if ($request->has('month') && $request->month) {
            $monthYear = explode('-', $request->month);
            if (count($monthYear) === 2) {
                $query->where('year', $monthYear[0])
                      ->where('month', $monthYear[1]);
            }
        }

        $letters = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('outgoing-letters/index', [
            'letters' => $letters,
            'filters' => $request->only(['search', 'category', 'month']),
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('outgoing-letters/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOutgoingLetterRequest $request)
    {
        $letter = $this->letterService->createOutgoingLetter(
            $request->validated(),
            auth()->id()
        );

        return redirect()->route('outgoing-letters.show', $letter)
            ->with('success', 'Nomor surat berhasil dibuat: ' . $letter->full_number);
    }

    /**
     * Display the specified resource.
     */
    public function show(OutgoingLetter $outgoingLetter)
    {
        // Check authorization
        if (!auth()->user()->isAdmin() && $outgoingLetter->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $outgoingLetter->load('user');

        return Inertia::render('outgoing-letters/show', [
            'letter' => $outgoingLetter,
            'isAdmin' => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OutgoingLetter $outgoingLetter)
    {
        // Only admin can edit
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('outgoing-letters/edit', [
            'letter' => $outgoingLetter,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOutgoingLetterRequest $request, OutgoingLetter $outgoingLetter)
    {
        $letter = $this->letterService->updateOutgoingLetter(
            $outgoingLetter,
            $request->validated()
        );

        return redirect()->route('outgoing-letters.show', $letter)
            ->with('success', 'Surat berhasil diperbarui dengan nomor: ' . $letter->full_number);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OutgoingLetter $outgoingLetter)
    {
        // Only admin can delete
        if (!auth()->user()->isAdmin()) {
            abort(403, 'Unauthorized');
        }

        $outgoingLetter->delete();

        return redirect()->route('outgoing-letters.index')
            ->with('success', 'Surat berhasil dihapus.');
    }


}