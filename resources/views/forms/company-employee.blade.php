@php
$d_company = 'company';
$d_employee_id = 'employee_id';
@endphp

<div class="mb-3 col-12">
    <label for="company" class="form-label">Firma</label>
    <select class="form-select" id="company" name="@if(isset($variable_company)){{$variable_company}}@else{{$d_company}}@endif"
    onchange="updateEmployeesList();" required>
            <option value=''>--- Wybierz Firmę ---</option>
        @foreach ($companies as $company)
            <option
            @if(old('company', $selected_company) == $company->id) selected='selected' @endif
            value={{$company->id}}>{{$company->name_short}} [{{$company->name_complete}}]</option>
        @endforeach
    </select>
</div>

<div class="mb-3 col-12">
    <label for="employee" class="form-label">Pracownik</label>
    <select class="form-select" id="employee" name="@if(isset($variable_employee)){{$variable_employee}}@else{{$d_employee_id}}@endif" required>
        <option value=''>--- Wybierz Pracownika ---</option>
        @foreach ($employees as $employee)
            <option
            @if(old('employee', $selected_employee) == $employee->id) selected='selected' @endif
            value={{$employee->id}} data-company={{$employee->company}}>{{$employee->name}} {{$employee->surname}}</option>
        @endforeach
    </select>
</div>
