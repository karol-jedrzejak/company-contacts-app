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

        return Inertia::render('CompaniesEmployees/Index', ['items' => CompaniesEmployees::inCompany($id)->get(), 'new_item' => new CompaniesEmployees]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Companies/Edit', ['item' => new Companies, 'mode' => 'add']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompaniesEmployeesStoreRequest $request)
    {
        $request->validated();
        $data = $request->post();
        $data['id'] = null;
        Companies::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render(
            'Companies/Show',
            [
                'item' => Companies::find($id),
                'child_count' => [
                    'employees' =>
                    [
                        "active" => CompaniesEmployees::where('active', "=", 1)->inCompany($id)->count(),
                        "archive" => CompaniesEmployees::where('active', "=", 0)->inCompany($id)->count()
                    ],
                    'sales_topics' =>
                    [
                        "active" => DB::table('sales_contacts')
                            ->join('companies_employees', 'sales_contacts.companies_employees_id', 'companies_employees.id')
                            ->join('companies', 'companies_employees.companies_id', 'companies.id')
                            ->where('sales_contacts.active', '=', 1)->where('companies_id', '=', $id)->count(),
                        "archive" => DB::table('sales_contacts')
                            ->join('companies_employees', 'sales_contacts.companies_employees_id', 'companies_employees.id')
                            ->join('companies', 'companies_employees.companies_id', 'companies.id')
                            ->where('sales_contacts.active', '=', 0)->where('companies_id', '=', $id)->count()
                    ],
                    'meetings' =>
                    [
                        "active" => DB::table('calendars')
                            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
                            ->join('companies', 'companies_employees.companies_id', 'companies.id')
                            ->whereDate('end', '>', \Carbon\Carbon::now())->where('companies_id', '=', $id)->count(),
                        "archive" => DB::table('calendars')
                            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
                            ->join('companies', 'companies_employees.companies_id', 'companies.id')
                            ->whereDate('end', '<=', \Carbon\Carbon::now())->where('companies_id', '=', $id)->count()
                    ]
                ]
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Companies/Edit', ['item' => Companies::find($id), 'mode' => 'edit']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompaniesEmployeesUpdateRequest  $request, string $id)
    {
        $request->validated();
        $data = $request->post();
        $item = Companies::find($id);
        $item->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Companies::find($id)->delete();
    }
}
