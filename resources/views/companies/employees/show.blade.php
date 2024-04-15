@extends('layouts.body')

@section('content')

<main class="container-fluid mb-3">
    <div class="row">
        <div class="mb-3 col-12 col-lg-6">
            <div class="card bg-dark">
                <div class="card-header bg-ts-yellow text-black">Pracownik</div>
                <div class="card-body text-white">
                    <table class="table table-dark table-striped align-middle">
                        <thead class="thead">
                            <tr>
                                <th scope="col" style="width:180px">Nazwa</th>
                                <th scope="col">Wartość</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Imię i Nazwisko:</td>
                                <td>{{$employees->name}} {{$employees->surname}}</td>
                            </tr>
                            @if($employees->position)
                            <tr>
                                <td>Stanowisko:</td>
                                <td>{{$employees->position}}</td>
                            </tr>
                            @endif
                            @if($employees->email)
                            <tr>
                                <td>E-mail:</td>
                                <td><button onclick="location.href='mailto:{{$employees->email}}'" class="btn btn-ts-yellow">{{$employees->email}}</button></td>
                            </tr>
                            @endif
                            @if($employees->phone)
                            <tr>
                                <td>Telefon:</td>
                                <td><button onclick="location.href='tel:+48{{$employees->phone}}'" class="btn btn-ts-yellow">+48 {{$employees->phone}}</button></td>
                            </tr>
                            @endif
                            <tr>
                                <td>Firma - Nazwa Pełna:</td>
                                <td><a href="{{ route('companies.show', ['company' => $companies->id]) }}" class="btn btn-ts-yellow">{{$companies->name_complete}}</a></td>
                            </tr>
                            <tr>
                                <td>Firma - Adress:</td>
                                <td><a href="{{$companies->adress_google}}" class="btn btn-ts-yellow">{{$companies->adress_1}}; {{$companies->adress_2}}</a></td>
                            </tr>
                            <tr>
                                <td>Dane do oferty:</td>
                                <td>
                                    <textarea style="height: 230px; resize: none;" readonly class="form-control">{{$companies->name_complete}}
{{$companies->adress_1}}
{{$companies->adress_2}}

@if($employees->position)
{{$employees->position}}
@endif
@if(substr($employees->name, -1) == 'a')
Szanowna Pani
@elseif(substr($employees->name, -1) != 'a')
Szanowny Pan
@endif
{{$employees->name}} {{$employees->surname}}
@if($employees->email)
E-mail: {{$employees->email}}
@endif
@if($employees->phone)
Telefon: +48 {{$employees->phone}}@endif</textarea>
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
