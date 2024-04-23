@extends('layouts.body')

@section('content')

<main class="container-fluid mb-3">
    <div class="card ">
        <div class="card-header text-bg-primary">Firmy</div>
        <div class="card-body ">
            <table class="table table-striped align-middle" id="table_grid">
                <thead class="thead">
                    <tr>
                        <th scope="col">Nazwa<br>Skrócona</th>
                        <th scope="col">Nazwa<br>Pełna</th>
                        <th scope="col">Państwo</th>
                        <th scope="col">Adres</th>
                        <th scope="col" class="datatable-row-auto">Edycja</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</main>

<input hidden type="number" value=0 id="active">

<script>
    var companyCreate = {!! json_encode(route('companies.create'))!!};
    var companyAjax = {!! json_encode(route('companies.ajax'))!!};
</script>
    @vite(['resources/js/Datatables/companies.js'])


@endsection
