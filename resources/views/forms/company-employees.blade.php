<div class="mb-3 col-12">
    <label for="company" class="form-label">Firma</label>
    <select class="form-select" id="company" name="company" onchange="updateEmployeesList();" required>
            <option value=''>--- Wybierz Firmę ---</option>
        @foreach ($companies as $company)
            <option
            @if(old('company') == $company->id) selected='selected' @endif
            value={{$company->id}}>{{$company->name_short}} [{{$company->name_complete}}]</option>
        @endforeach
    </select>
</div>

<div class="mb-3 col-10" id="employee_col_0">
    <label for="employee_0" id="employee_label_0" class="form-label">Pracownik 1</label>
    <select class="form-select" id="employee_0" name="employee_[0]" required>
        <option value=''>--- Wybierz Pracownika ---</option>
        @foreach ($employees as $employee)
            <option
            @if(old('employee_[0]') == $employee->id) selected='selected' @endif
            value={{$employee->id}} data-company={{$employee->company}}>{{$employee->name}} {{$employee->surname}}</option>
        @endforeach
    </select>
</div>



<div class="mb-3 col-2">
    <label for="employee_add" class="form-label">&nbsp;</label>
    <button id="employee_add" type="button" class="btn btn-primary w-100" onclick="addEmployee();">Dodaj</button>
</div>

<div class="mb-3 col-2" id="employess_col_del_0" hidden>
    <label for="employee_del_0" id="employee_del_label_0" class="form-label">&nbsp;</label>
    <button id="employee_del_0" type="button" class="btn btn-danger w-100" onclick="">Usuń</button>
</div>
