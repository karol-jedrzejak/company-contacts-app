<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Query\JoinClause;

use App\Models\SalesContacts;
use App\Models\Companies;
use App\Models\CompaniesEmployees;

use App\Http\Requests\SalesContactsStoreRequest;
use App\Http\Requests\SalesContactsUpdateRequest;

use Inertia\Inertia;


class SalesContactsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $latest_updates = DB::table('sales_contacts_statuses')
            ->select(
                DB::raw('max(sales_contacts_statuses.id) as id'),
                'sales_contacts_id',
            )->groupBy('sales_contacts_id');


        $sales_contacts = DB::table('sales_contacts')
            ->join('companies_employees', 'sales_contacts.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->joinSub($latest_updates, 'latest_updates', function (JoinClause $join) {
                $join->on('sales_contacts.id', '=', 'latest_updates.sales_contacts_id');
            })
            ->join('sales_contacts_statuses', 'sales_contacts_statuses.id', '=', 'latest_updates.id')
            ->join('users', 'users.id', '=', 'sales_contacts_statuses.user_id')
            ->select(
                'sales_contacts.*',
                'companies.id as company_id',
                'companies.name_short as company_name',
                'companies_employees.id as companies_employees_id',
                'companies_employees.name as companies_employees_name',
                'companies_employees.surname as companies_employees_surname',
                'companies_employees.surname as companies_employees_surname',
                'sales_contacts_statuses.user_id as latest_user_id',
                'sales_contacts_statuses.description as latest_description',
                'sales_contacts_statuses.created_at as latest_created_at',
                'sales_contacts_statuses.updated_at as latest_updated_at',
                'users.name as latest_user_name',
            )
            ->get();

        return Inertia::render('SalesContacts/Index', ['items' => $sales_contacts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('SalesContacts/Edit', [
            'item' => new SalesContacts,
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
    public function store(SalesContactsStoreRequest $request)
    {
        $request->validated();
        $data = $request->post();
        $data['id'] = null;
        $data['user_id'] = Auth::id();
        SalesContacts::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        /*         $item = DB::table('SalesContacts')
            ->join('companies_employees', 'SalesContacts.companies_employees_id', 'companies_employees.id')
            ->join('companies', 'companies_employees.companies_id', 'companies.id')
            ->select(
                'SalesContacts.*',
                'companies.id as company_id',
                'companies.name_short as company_name',
                'companies_employees.id as companies_employees_id',
                'companies_employees.name as companies_employees_name',
                'companies_employees.surname as companies_employees_surname',
            )
            ->where('SalesContacts.id', $id)->first(); */

        $item = SalesContacts::find($id);
        $employee = CompaniesEmployees::find($item->companies_employees_id);
        $company = Companies::find(
            $employee->companies_id
        );

        return Inertia::render('SalesContacts/Show', [
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
        return Inertia::render('SalesContacts/Edit', [
            'item' => SalesContacts::find($id),
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
    public function update(SalesContactsUpdateRequest  $request, string $id)
    {
        $request->validated();
        $data = $request->post();
        $item = SalesContacts::find($id);
        $item->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        SalesContacts::find($id)->delete();
    }
}
