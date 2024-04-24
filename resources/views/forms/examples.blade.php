@include('forms.single', [
    'ft_widthClass' => 'col-12',
    'ft_text' => 'NIP',
    'ft_type' => 'number',
    'ft_variable' => 'nip',
    'ft_value' => $companies->nip,
    'ft_required' => false,
    'ft_step' => 1
    ])

@include('forms.double', [
    'ft_widthClass' => 'col-4',
    'ft_group_id' => 'adressNubmers',
    'ft_separator' => '/',
    'ft_text' => 'Numer',
    'ft_1_type' => 'text',
    'ft_1_variable' => 'adress_number',
    'ft_1_value' => $companies->adress_number,
    'ft_1_required' => true,
    'ft_2_type' => 'text',
    'ft_2_variable' => 'adress_sub_number',
    'ft_2_value' => $companies->adress_sub_number,
    'ft_2_required' => false
    ])

@include('forms.company-employee')
@include('forms.company-employees')

@include('forms.select-set', [
    'ft_widthClass' => 'col-12',
    'ft_text' => 'Województwo',
    'ft_variable' => 'voivodeship',
    'ft_types' => $voivodeships,
    'ft_current' => $companies->voivodeship,
    'ft_required' => true
    ])

@include('forms.active', [
    'ft_widthClass' => 'col-12',
    'ft_text' => 'Aktywna',
    'ft_variable' => 'active',
    'ft_current' => $companies->active,
    'ft_required' => true
    ])



@if ($mode == 'edit')

    <div class="card bg-dark mb-2">
        <div class="card-header bg-ts-yellow text-black">Firma -> Pracownik</div>
        <div class="card-body text-white">
            <div>
                <a href="{{ route('employees.show', ['employee' => $employee->id]) }}" class="btn btn-light m-1">{{$employee->name}} {{$employee->surname}}</a>
                @if($employee->email) <button onclick="location.href='mailto:{{$employee->email}}'" class="btn btn-ts-yellow">{{$employee->email}}</button> @endif
                @if($employee->phone) <button onclick="location.href='tel:+48{{$employee->phone}}'" class="btn btn-ts-yellow">+48 {{$employee->phone}}</button> @endif
            </div>
            <div>
                <a href="{{ route('companies.show', ['company' => $company->id]) }}" class="btn btn-success m-1">{{$company->name_complete}}</a>
                <a href="{{$company->AdressGoogle}}" class="btn btn-primary m-1">{{$company->Adress1}}; {{$company->Adress2}}</a>
            </div>
        </div>
    </div>

@endif
