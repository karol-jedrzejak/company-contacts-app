<?php

namespace App\Http\Requests\Employees;;

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
        $surname = $this->request->get('surname');
        $name = $this->request->get('name');

        return [
            'name' => ['required', Rule::unique('companies_employees', 'name')->where(function ($query) use ($surname) {
                return $query->where('surname', '=', $surname);
            })->ignore($this->request->get('id'))],
            'surname' => ['required', Rule::unique('companies_employees', 'surname')->where(function ($query) use ($name) {
                return $query->where('name', '=', $name);
            })->ignore($this->request->get('id'))],
            'email' => 'nullable|email:rfc,dns',
            'phone' => 'nullable|numeric|min_digits:9',
            'birth_date' => 'nullable|date'
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Istnieje już pracownik o takim Imieniu i Nazwisku.',
            'surname.unique' => 'Jeśli jest to inna osoba o takim samym imieniu i nazwisku to skonsultuj się z administratorem.',
            'email.email' => 'Wprowadź poprawny adres e-mail.',
            'phone.numeric' => 'Numer telefonu może składać się tylko z cyfr.',
            'phone.min_digits' => 'Numer telefonu musi mieć przynajmniej 9 cyfr.',
        ];
    }
}
