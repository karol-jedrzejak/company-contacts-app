<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Calendars;
use App\Models\Companies;
use App\Models\CompaniesEmployees;

use App\Http\Requests\CalendarsStoreRequest;
use App\Http\Requests\CalendarsUpdateRequest;

use Inertia\Inertia;


class CalendarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Calendars/Index', ['items' => DB::table('calendars')
            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->select(
                'calendars.*',
                'companies.name_short as company_name',
                'companies_employees.name as companies_employees_name',
                'companies_employees.surname as companies_employees_surname',
            )
            ->where('user_id', Auth::id())->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Calendars/Edit', [
            'item' => new Calendars,
            'mode' => 'add',
            'employees' => DB::table('companies_employees')
                ->join('companies', 'companies_employees.companies_id', 'companies.id')
                ->select(
                    'companies_employees.*',
                    'companies.name_short as company_name',
                )->orderBy('companies_employees.name', 'asc')->orderBy('companies_employees.surname', 'asc')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CalendarsStoreRequest $request)
    {
        $request->validated();
        $data = $request->post();
        $data['id'] = null;
        $data['user_id'] = Auth::id();
        Calendars::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /*         $item = DB::table('calendars')
            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->select(
                'calendars.*',
                'companies.id as company_id',
                'companies.name_short as company_name',
                'companies_employees.id as companies_employees_id',
                'companies_employees.name as companies_employees_name',
                'companies_employees.surname as companies_employees_surname',
            )
            ->where('calendars.id', $id)->first(); */

        $item = Calendars::find($id);
        $employee = CompaniesEmployees::find($item->companies_employees_id);
        $company = Companies::find(
            $employee->companies_id
        );

        return Inertia::render('Calendars/Show', [
            'item' => $item,
            'employee' => $employee,
            'company' => $company,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Calendars/Edit', [
            'item' => Calendars::find($id),
            'mode' =>
            'edit',
            'employees' => DB::table('companies_employees')
                ->join('companies', 'companies_employees.companies_id', 'companies.id')
                ->select(
                    'companies_employees.*',
                    'companies.name_short as company_name',
                )->orderBy('companies_employees.name', 'asc')->orderBy('companies_employees.surname', 'asc')->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CalendarsUpdateRequest  $request, string $id)
    {
        $request->validated();
        $data = $request->post();
        $item = Calendars::find($id);
        $item->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Calendars::find($id)->delete();
    }
}
