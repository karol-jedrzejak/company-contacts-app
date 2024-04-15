@extends('layouts.body')

@section('content')

<main class="container-fluid mb-3">
    <div class="row">
        <div class="mb-3 col-12 col-lg-6">
            <div class="card bg-dark">
                <div class="card-header bg-ts-yellow text-black">Firma</div>
                <div class="card-body text-white">
                    <table class="table table-dark table-striped align-middle">
                        <thead class="thead">
                            <tr>
                                <th scope="col" style="width:140px">Nazwa</th>
                                <th scope="col">Wartość</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nazwa Skrócona:</td>
                                <td>{{$companies->name_short}}
                                    <a class="btn btn-ts-yellow datatable-button"
                                        href="{{ route('companies.edit', ['company' => $companies->id]) }}">
                                        <img src="{{URL::to('/').'/images/icons/datatables/edit.svg'}}" class="datatable-icon"/>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Nazwa Pełna:</td>
                                <td>{{$companies->name_complete}}</td>
                            </tr>
                            <tr>
                                <td>Adress:</td>
                                <td><a href="{{$companies->adress_google}}" class="btn btn-ts-yellow">{{$companies->adress_1}}; {{$companies->adress_2}}</a></td>
                            </tr>
                            <tr>
                                <td>Województwo:</td>
                                <td>{{$companies->voivodeship}}</td>
                            </tr>
                            <tr>
                                <td>Dane do oferty:</td>
                                <td>
                                    <textarea style="height: 85px; resize: none;" readonly class="form-control">{{$companies->name_complete}}
{{$companies->adress_1}}
{{$companies->adress_2}}</textarea>
                                </td>
                            </tr>
                            @if($companies->nip)
                            <tr>
                                <td>NIP:</td>
                                <td>{{$companies->nip}}</td>
                            </tr>
                            @endif
                            <tr>
                                <td>Pracownicy</td>
                                <td><a class="btn btn-primary"
                                        href="{{ route('companies.employees.index', ['company' => $companies->id]) }}">
                                        Lista <img src="{{URL::to('/').'/images/icons/datatables/employees.svg'}}" class="datatable-icon"/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="mb-3 col-12 col-lg-6">
            <div class="card bg-dark">
                <div class="card-header bg-ts-yellow text-black">Statystyki</div>
                <div class="card-body text-white">
                    W budowie<br>
                </div>
            </div>
        </div>
    </div>
</main>


@endsection
