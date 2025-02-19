<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'nip' => [
                'digits:10',
                Rule::unique('companies')->ignore($this->company),
            ],
            'name_short' => [
                'required',
                Rule::unique('companies')->ignore($this->company),
            ],
            'name_complete' => [
                'required',
                Rule::unique('companies')->ignore($this->company),
            ],
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
            'nip.unique' => 'A company with the given NIP already exists.',
            'name_short.unique' => 'A company with the given short name already exists. Provide unique name.',
            'name_complete.unique' => 'There is already a company with the given full name. Provide unique name.',
            'adress_postcode.numeric' => 'Enter the postcode without spaces or dashes.',
            'nip.digits' => 'The NIP number must be 10 digits long.',
        ];
    }
}
