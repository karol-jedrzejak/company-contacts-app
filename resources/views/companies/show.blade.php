@extends('layouts.body')

@section('content')

<main class="container-fluid mb-3">
    <div class="row">
        <div class="mb-3 col-12 col-lg-6">
            <div class="card">
                <div class="card-header bg-info">Firma</div>
                <div class="card-body">
                    <table class="table table-striped align-middle">
                        <thead class="thead">
                            <tr>
                                <th scope="col" style="width:140px">Nazwa</th>
                                <th scope="col">Wartość</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nazwa Skrócona:</td>
                                <td>{{$company->name_short}}
                                    <a class="btn btn-warning bi bi-pencil-square ms-3" style="color:yellow;"
                                        href="{{ route('companies.edit', ['company' => $company->id]) }}">
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td>Nazwa Pełna:</td>
                                <td>{{$company->name_complete}}</td>
                            </tr>
                            <tr>
                                <td>NIP:</td>
                                <td>{{$company->nip}}</td>
                            </tr>
                            <tr>
                                <td>Addres - ulica:</td>
                                <td>{{$company->adress_street}} {{$company->adress_number}}</td>
                            </tr>
                            <tr>
                                <td>Addres - miasto:</td>
                                <td>{{$company->adress_city}}</td>
                            </tr>
                            <tr>
                                <td>Addres - kod pocztowy:</td>
                                <td>{{$company->adress_postcode}}</td>
                            </tr>
                            <tr>
                                <td>Addres - Państwo:</td>
                                <td>{{$company->country}}</td>
                            </tr>
                            <tr>
                                <td>Długość Geograficzna:</td>
                                <td>{{$company->coordinate_latitude}}</td>
                            </tr>
                            <tr>
                                <td>Szerokość geograficzna:</td>
                                <td>{{$company->coordinate_longitude}}</td>
                            </tr>
                            <tr>
                                <td>Czy Aktywna:</td>
                                @if($company->active)
                                <td>Tak</td>
                                @else
                                <td>Nie</td>
                                @endif
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>


@endsection
