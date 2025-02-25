<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompaniesEmployeesStoreRequest extends FormRequest
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
            'adress_number' => 'required',
            'name' => 'required',
            'surname' => 'required',
            'position' => 'required',
            'mobile' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'active' => 'required',
        ];
    }

    public function messages(): array
    {
        return [];
    }
}
