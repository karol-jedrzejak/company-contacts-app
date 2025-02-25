<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CalendarsUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    /*     public function authorize(): bool
    {
        return true;
    } */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'companies_employees_id' => 'required|integer',
            'title' => 'required',
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
        ];
    }

    public function messages(): array
    {
        return [];
    }
}
