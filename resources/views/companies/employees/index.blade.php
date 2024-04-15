@extends('layouts.body')

@section('content')

<main class="container-fluid mb-3">
    <div class="card bg-dark mb-2">
        <div class="card-header bg-ts-yellow text-black">Firma</div>
        <div class="card-body text-white d-flex flex-wrap">
            <a href="{{ route('companies.show', ['company' => $companies->id]) }}" class="btn btn-success m-1">{{$companies->name_complete}}</a>
            <a href="{{$companies->adress_google}}" class="btn btn-primary m-1">{{$companies->adress_1}}; {{$companies->adress_2}}</a>

        </div>
    </div>

    <div class="card bg-dark">
        <div class="card-header bg-ts-yellow text-black">Pracownicy</div>
        <div class="card-body text-white">
            <table class="table table-dark table-striped align-middle" id="table_grid">
                <thead class="thead">
                    <tr>
                        <th scope="col">Imię</th>
                        <th scope="col">Nazwisko</th>
                        <th scope="col">Pozycja</th>
                        <th scope="col">Tel</th>
                        <th scope="col">E-mail</th>
                        <th scope="col" class="datatable-row-auto">Edycja</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</main>

<input hidden type="number" value=0 id="active">

<script>
    var employeesCreate = {!! json_encode(route('companies.employees.create',['company' => $companies->id]))!!};
    var employeesAjax = {!! json_encode(route('companies.employees.ajax',['id' => $companies->id]))!!};
</script>

  @vite(['resources/js/Datatables/companies-employees.js'])

@endsection
