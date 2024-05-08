@extends('layouts.body')

@section('content')

<main class="container mb-3">

@include('forms.errors')

    <div class="card">
        @if ($mode == 'create')
        <div class="card-header bg-info">Formularz dodania firmy</div>
        <div class="card-body">
                <form class="" action="{{ route('companies.store') }}" method="post" enctype="multipart/form-data">
        @endif
        @if ($mode == 'edit')
        <div class="card-header bg-info">Formularz edycji firmy</div>
        <div class="card-body">
                <form class="" action="{{ route('companies.update', $company->id) }}" method="post" enctype="multipart/form-data">
                <input name="_method" type="hidden" value="PUT">
        @endif
                @csrf
                <!-- X-XSRF-TOKEN -->
                <div class="row">

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-3',
                        'ft_text' => 'Nazwa Skrócona',
                        'ft_type' => 'text',
                        'ft_variable' => 'name_short',
                        'ft_value' => $company->name_short,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-9',
                        'ft_text' => 'Nazwa Pełna',
                        'ft_type' => 'text',
                        'ft_variable' => 'name_complete',
                        'ft_value' => $company->name_complete,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-8',
                        'ft_text' => 'Ulica',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_street',
                        'ft_value' => $company->adress_street,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-4',
                        'ft_text' => 'Numer',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_number',
                        'ft_value' => $company->adress_number,
                        'ft_required' => false
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-5',
                        'ft_text' => 'Miejscowość',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_city',
                        'ft_value' => $company->adress_city,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-4 col-lg-2',
                        'ft_text' => 'Kod Pocztowy',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_postcode',
                        'ft_value' => $company->adress_postcode,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-8 col-lg-5',
                        'ft_text' => 'Państwo',
                        'ft_type' => 'text',
                        'ft_variable' => 'country',
                        'ft_value' => $company->country,
                        'ft_required' => true
                        ])

                    @include('forms.active', [
                        'ft_widthClass' => 'col-12',
                        'ft_text' => 'Aktywna',
                        'ft_variable' => 'active',
                        'ft_current' => $company->active,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12',
                        'ft_text' => 'NIP',
                        'ft_type' => 'number',
                        'ft_variable' => 'nip',
                        'ft_value' => $company->nip,
                        'ft_required' => false,
                        'ft_step' => 1
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-6',
                        'ft_text' => 'Dł. Geograficzna',
                        'ft_type' => 'number',
                        'ft_variable' => 'coordinate_longitude',
                        'ft_value' => $company->coordinate_longitude,
                        'ft_required' => false,
                        'ft_step' => 0.0001,
                        'ft_min' => -180,
                        'ft_max' => 180
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-6',
                        'ft_text' => 'Sz. Geograficzna',
                        'ft_type' => 'number',
                        'ft_variable' => 'coordinate_latitude',
                        'ft_value' => $company->coordinate_latitude,
                        'ft_required' => false,
                        'ft_step' => 0.0001,
                        'ft_min' => -90,
                        'ft_max' => 90
                        ])

                </div>
                <div class="row">
                    <div class="col-12 col-lg-6 text-end text-lg-start mt-1">
                        <button type="button" onclick="PobierzDane();" class="btn btn-primary">GPS - OpenMaps</button>
                        <button type="button" onclick="OdpalGoogleMaps();" class="btn btn-primary">GPS - GoogleMaps</button>
                        @if ($mode == 'edit')
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DelateModal">
                            Usuń
                            </button>
                        @endif
                    </div>
                    <div class="col-12 col-lg-6 text-end mt-1">
        @if ($mode == 'edit')
                        <input type="hidden" name="id" value={{ $company->id}}>
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
            <form class="d-flex justify-content-end" action="{{ route('companies.destroy', $company->id) }}" method="post" enctype="multipart/form-data">
                @csrf
                <input name="_method" type="hidden" value="DELETE">

                <!-- Modal -->
                <div class="modal fade" id="DelateModal" tabindex="-1" aria-labelledby="DelateModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header card-header bg-info">
                        <h4 class="modal-title" id="DelateModalLabel"><strong>!! UWAGA !!</strong></h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-left">
                        Czy na pewno chcesz usunąć tę firmę ? Operacji nie da się cofnąć !
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

    @vite(['resources/js/companies-GPS.js'])

@endsection
