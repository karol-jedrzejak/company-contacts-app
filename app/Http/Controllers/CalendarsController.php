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
        $events = Calendars::where('user_id', Auth::id())->get();
        $events2 = DB::table('calendars')
            ->join('companies_employees', 'calendars.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->select('calendars.*')
            //->select(['calendars.*'; 'companies.* as company'; 'companies_employees.* as employee'])
            ->where('user_id', Auth::id())->get();


        return Inertia::render('Calendars/Index', ['items' => $events, 'events' => $events, 'events2' => $events2]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Calendars/Edit', ['item' => new Calendars, 'mode' => 'add']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CalendarsStoreRequest $request)
    {
        $request->validated();
        $data = $request->post();
        $data['id'] = null;
        Calendars::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render(
            'Calendars/Show',
            [
                'item' => Calendars::find($id),
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
        return Inertia::render('Calendars/Edit', ['item' => Calendars::find($id), 'mode' => 'edit']);
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
