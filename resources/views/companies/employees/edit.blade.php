@extends('layouts.body')

@section('content')

<main class="container mb-3">

@include('forms.errors')

    <div class="card bg-dark mb-2">
        <div class="card-header bg-ts-yellow text-black">Firma</div>
        <div class="card-body text-white d-flex flex-wrap">
            <a href="{{ route('companies.show', ['company' => $company->id]) }}" class="btn btn-success m-1">{{$company->name_complete}}</a>
            <a href="{{$company->adress_google}}" class="btn btn-primary m-1">{{$company->adress_1}}; {{$company->adress_2}}</a>

        </div>
    </div>

    <div class="card bg-dark">
        @if ($mode == 'create')
        <div class="card-header bg-ts-yellow text-black">Formularz dodania pracownika</div>
        <div class="card-body text-white">
                <form class="" action="{{ route('companies.employees.store', $company->id) }}" method="post" enctype="multipart/form-data">
        @endif
        @if ($mode == 'edit')
        <div class="card-header bg-ts-yellow text-black">Formularz edycji pracownika</div>
        <div class="card-body text-white">
                <form class="" action="{{ route('employees.update', $employees->id) }}" method="post" enctype="multipart/form-data">
                <input name="_method" type="hidden" value="PUT">
        @endif
                @csrf
                <!-- X-XSRF-TOKEN -->
                <div class="row">
                     @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Imię',
                        'ft_type' => 'text',
                        'ft_variable' => 'name',
                        'ft_value' => $employees->name,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Nazwisko',
                        'ft_type' => 'text',
                        'ft_variable' => 'surname',
                        'ft_value' => $employees->surname,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12',
                        'ft_text' => 'Stanowisko',
                        'ft_type' => 'text',
                        'ft_variable' => 'position',
                        'ft_value' => $employees->position,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Telefon',
                        'ft_type' => 'text',
                        'ft_variable' => 'phone',
                        'ft_value' => $employees->phone,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'E-mail',
                        'ft_type' => 'text',
                        'ft_variable' => 'email',
                        'ft_value' => $employees->email,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Data Urodzenia',
                        'ft_type' => 'date',
                        'ft_variable' => 'birth_date',
                        'ft_value' => $employees->birth_date,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Miejsce Urodzenia',
                        'ft_type' => 'text',
                        'ft_variable' => 'birth_place',
                        'ft_value' => $employees->birth_place,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Dokument Toższamości - Nazwa',
                        'ft_type' => 'text',
                        'ft_variable' => 'identity_name',
                        'ft_value' => $employees->identity_name,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-6',
                        'ft_text' => 'Dokument Toższamości - Numer',
                        'ft_type' => 'text',
                        'ft_variable' => 'identity_value',
                        'ft_value' => $employees->identity_value,
                        'ft_required' => false
                        ])

                    @include('forms.active', [
                        'ft_widthClass' => 'col-12',
                        'ft_text' => 'Aktywna',
                        'ft_variable' => 'active',
                        'ft_current' => $employees->active,
                        'ft_required' => true
                        ])

                </div>

                <div class="row">
                    <div class="col-12 col-lg-6 text-end text-lg-start mt-1">
                        @if ($mode == 'edit')
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DelateModal">
                            Usuń
                            </button>
                        @endif
                    </div>
                    <div class="col-12 col-lg-6 text-end mt-1">
                        <input type="hidden" name="company" value={{ $company->id}}>
        @if ($mode == 'edit')
                        <input type="hidden" name="id" value={{ $employees->id}}>
                        <input type="submit" value="Zmień" class="btn btn-success"/>
        @endif
        @if ($mode == 'create')
                        <input type="submit" value="Dodaj" class="btn btn-success"/>
        @endif
                        <a href="{{ url()->previous() }}" class="btn btn-warning">Anuluj</a></form>
                    </div>
                </div>
            {{-- </form> --}}
        @if ($mode == 'edit')
            <form class="d-flex justify-content-end" action="{{ route('employees.destroy', $employees->id) }}" method="post" enctype="multipart/form-data">
                @csrf
                <input name="_method" type="hidden" value="DELETE">

                <!-- Modal -->
                <div class="modal fade" id="DelateModal" tabindex="-1" aria-labelledby="DelateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark">
                    <div class="modal-header card-header bg-ts-yellow text-black">
                        <h4 class="modal-title" id="DelateModalLabel"><strong>!! UWAGA !!</strong></h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-left">
                        Czy na pewno chcesz usunąć tego pracownika ? Operacji nie da się cofnąć !
                    </div>
                    <div class="modal-footer">
                        <input type="submit" value="Usuń" class="btn btn-danger"/>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Anuluj</button>
                    </div>
                    </div>
                </div>
                </div>
            </form>
        @endif
        </div>
    </div>
</main>

@endsection
