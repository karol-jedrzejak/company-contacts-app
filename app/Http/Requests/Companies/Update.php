<?php

namespace App\Http\Requests\Companies;;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name_short' => [
                'required',
                Rule::unique('companies')->ignore($this->request->get('id')),
            ],
            'name_complete' => [
                'required',
                Rule::unique('companies')->ignore($this->request->get('id')),
            ],
            'adress_number' => 'required',
            'adress_street' => 'required',
            'adress_city' => 'required',
            'adress_postcode' => 'required|numeric|digits:5',
            'country' => 'required',
            'active' => 'required',
            'nip' => 'nullable|digits:10'
        ];
    }

    public function messages()
    {
        return [
            'name_short.unique' => 'Istnieje już firma z podaną nawą skróconą. Sprawdz czy firma o podanej nazwie nie jest już w bazie firm.',
            'name_complete.unique' => 'Istnieje już firma z podaną nawą pełną. Sprawdz czy firma o podanej nazwie nie jest już w bazie firm.',
            'adress_postcode.numeric' => 'Wprowadź kod pocztowy bez spacji bądź myślnika.',
            'adress_postcode.digits' => 'Kod pocztowy musi mieć 5 cyfr.',
            'nip.digits' => 'Numer NIP musi mieć 10 cyfr.',
        ];
    }
}
