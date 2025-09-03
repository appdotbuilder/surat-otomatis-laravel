<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOutgoingLetterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'letter_code' => 'required|string|max:255',
            'subject' => 'required|string|max:500',
            'destination' => 'required|string|max:255',
            'letter_date' => 'required|date',
            'category' => 'required|in:ketua,sekretaris,panitera',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'letter_code.required' => 'Kode surat harus diisi.',
            'letter_code.max' => 'Kode surat maksimal 255 karakter.',
            'subject.required' => 'Perihal surat harus diisi.',
            'subject.max' => 'Perihal surat maksimal 500 karakter.',
            'destination.required' => 'Tujuan surat harus diisi.',
            'destination.max' => 'Tujuan surat maksimal 255 karakter.',
            'letter_date.required' => 'Tanggal surat harus diisi.',
            'letter_date.date' => 'Tanggal surat harus berupa tanggal yang valid.',
            'category.required' => 'Kategori surat harus dipilih.',
            'category.in' => 'Kategori surat tidak valid.',
        ];
    }
}