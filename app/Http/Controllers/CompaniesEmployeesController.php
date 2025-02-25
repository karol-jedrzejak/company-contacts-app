<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\Companies;
use App\Models\CompaniesEmployees;
use App\Models\SalesContacts;
use App\Models\Calendars;
use App\Http\Requests\CompaniesEmployeesStoreRequest;
use App\Http\Requests\CompaniesEmployeesUpdateRequest;

use Inertia\Inertia;


class CompaniesEmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $id)
    {

        return Inertia::render('CompaniesEmployees/Index', [
            'company' => Companies::find($id),
            'items' => CompaniesEmployees::inCompany($id)->get(),
            'new_item' => new CompaniesEmployees
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(int $id)
    {
        return Inertia::render('CompaniesEmployees/Edit', [
            'item' => new CompaniesEmployees,
            'mode' => 'add',
            'company' => Companies::find($id)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompaniesEmployeesStoreRequest $request, int $id)
    {
        $request->validated();
        $data = $request->post();
        $data['id'] = null;
        $data['companies_id'] = $id;
        CompaniesEmployees::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = CompaniesEmployees::find($id);
        return Inertia::render(
            'CompaniesEmployees/Show',
            [
                'item' => $employee,
                'company' => Companies::find($employee->companies_id)
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $employee = CompaniesEmployees::find($id);
        return Inertia::render('CompaniesEmployees/Edit', [
            'item' => $employee,
            'mode' => 'edit',
            'company' => Companies::find($employee->companies_id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompaniesEmployeesUpdateRequest  $request, string $id)
    {
        $request->validated();
        $data = $request->post();
        $item = CompaniesEmployees::find($id);
        $item->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        CompaniesEmployees::find($id)->delete();
    }
}
