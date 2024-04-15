@extends('layouts.body')

@section('content')

<main class="container mb-3">

@include('forms.errors')

    <div class="card bg-dark">
        @if ($mode == 'create')
        <div class="card-header bg-ts-yellow text-black">Formularz dodania firmy</div>
        <div class="card-body text-white">
                <form class="" action="{{ route('companies.store') }}" method="post" enctype="multipart/form-data">
        @endif
        @if ($mode == 'edit')
        <div class="card-header bg-ts-yellow text-black">Formularz edycji firmy</div>
        <div class="card-body text-white">
                <form class="" action="{{ route('companies.update', $companies->id) }}" method="post" enctype="multipart/form-data">
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
                        'ft_value' => $companies->name_short,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-9',
                        'ft_text' => 'Nazwa Pełna',
                        'ft_type' => 'text',
                        'ft_variable' => 'name_complete',
                        'ft_value' => $companies->name_complete,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-8',
                        'ft_text' => 'Ulica',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_street',
                        'ft_value' => $companies->adress_street,
                        'ft_required' => false
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

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12 col-lg-5',
                        'ft_text' => 'Miejscowość',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_city',
                        'ft_value' => $companies->adress_city,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-4 col-lg-2',
                        'ft_text' => 'Kod Pocztowy',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_postcode',
                        'ft_value' => $companies->adress_postcode,
                        'ft_required' => true
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-8 col-lg-5',
                        'ft_text' => 'Poczta',
                        'ft_type' => 'text',
                        'ft_variable' => 'adress_post_office',
                        'ft_value' => $companies->adress_post_office,
                        'ft_required' => true
                        ])

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

                    <div class="text-ts-yellow">Opcjonalne<hr></div>

                    @include('forms.single', [
                        'ft_widthClass' => 'col-12',
                        'ft_text' => 'NIP',
                        'ft_type' => 'number',
                        'ft_variable' => 'nip',
                        'ft_value' => $companies->nip,
                        'ft_required' => false,
                        'ft_step' => 1
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-3',
                        'ft_text' => 'Dł. Geograficzna',
                        'ft_type' => 'number',
                        'ft_variable' => 'coordinate_NS',
                        'ft_value' => $companies->coordinate_NS,
                        'ft_required' => false,
                        'ft_step' => 0.0001
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-3',
                        'ft_text' => 'Sz. Geograficzna',
                        'ft_type' => 'number',
                        'ft_variable' => 'coordinate_WE',
                        'ft_value' => $companies->coordinate_WE,
                        'ft_required' => false,
                        'ft_step' => 0.0001
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-3',
                        'ft_text' => 'Odległość od TS',
                        'ft_type' => 'number',
                        'ft_variable' => 'distance',
                        'ft_value' => $companies->distance,
                        'ft_required' => false,
                        'ft_step' => 1,
                        'ft_min' => 0,
                        'ft_max' => 2000,
                        'ft_group_text' => 'km'
                        ])

                    @include('forms.single', [
                        'ft_widthClass' => 'col-6 col-lg-3',
                        'ft_text' => 'Czas dojazdu z TS',
                        'ft_type' => 'number',
                        'ft_variable' => 'distance_time',
                        'ft_value' => $companies->distance_time,
                        'ft_required' => false,
                        'ft_step' => 0.5,
                        'ft_min' => 0,
                        'ft_max' => 24,
                        'ft_group_text' => 'h'
                        ])

                    <div class="mb-3 col-12">
                        <label for="highways" class="form-label">Autostrady na trasie do firmy</label>
                        <select class="form-select form-select-sm" multiple multiple="multiple" id="highways" name="highways[]">
                            @foreach($highways ?? [] as $highway)
                                @if (in_array($highway->id,$companies->highways))
                                    <option selected='selected' value={{$highway->id}}>{{$highway->name.' '.$highway->segment}}</option>
                                @else
                                    <option value={{$highway->id}}>{{$highway->name.' '.$highway->segment}}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>

                </div>
                <div class="row">
                    <div class="col-12 col-lg-6 text-end text-lg-start mt-1">
                        <button type="button" onclick="PobierzDane();" class="btn btn-ts-yellow">GPS - OpenMaps</button>
                        <button type="button" onclick="OdpalGoogleMaps();" class="btn btn-ts-yellow">GPS - GoogleMaps</button>
                        @if ($mode == 'edit')
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DelateModal">
                            Usuń
                            </button>
                        @endif
                    </div>
                    <div class="col-12 col-lg-6 text-end mt-1">
        @if ($mode == 'edit')
                        <input type="hidden" name="id" value={{ $companies->id}}>
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
            <form class="d-flex justify-content-end" action="{{ route('companies.destroy', $companies->id) }}" method="post" enctype="multipart/form-data">
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

    @vite(['resources/js/Leaflet/companies-GPS.js'])

@endsection
