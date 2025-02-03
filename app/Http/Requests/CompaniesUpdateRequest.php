<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompaniesUpdateRequest extends FormRequest
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
            'nip' => 'nullable|digits:10',
            'name_short' => 'required|unique:companies',
            'name_complete' => 'required|unique:companies',
            'adress_number' => 'required',
            'adress_street' => 'required',
            'adress_city' => 'required',
            'adress_postcode' => 'required|numeric',
            'country' => 'required',
            'coordinate_latitude' => 'required|numeric|min:-180|max:180',
            'coordinate_longitude' => 'required|numeric|min:-180|max:180',
            'active' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name_short.unique' => 'A company with the given short name already exists. Provide unique name.',
            'name_complete.unique' => 'There is already a company with the given full name. Provide unique name.',
            'adress_postcode.numeric' => 'Enter the postcode without spaces or dashes.',
            'nip.digits' => 'The NIP number must be 10 digits long.',
        ];
    }
}
