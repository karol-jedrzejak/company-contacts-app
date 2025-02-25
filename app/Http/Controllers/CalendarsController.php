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
        $events = DB::table('calendars')
            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->select(
                'calendars.*',
                'companies.name_short as company_name',
                'companies_employees.name as companies_employees_name',
                'companies_employees.surname as companies_employees_surname',
            )
            ->where('user_id', Auth::id())->get();

        return Inertia::render('Calendars/Index', ['items' => $events, 'events' => $events]);
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
                )->get()
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
        return abort(404, 'Page not found');
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
                )->get()
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
