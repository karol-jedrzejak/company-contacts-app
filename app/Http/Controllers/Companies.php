<?php

namespace App\Http\Controllers;

use App\Models\Companies as CompaniesModel;
use App\Repository\Companies\CompaniesRepository;

use App\Http\Requests\Companies\Create as CompaniesCreate;
use App\Http\Requests\Companies\Update as CompaniesUpdate;

use Illuminate\Http\Request;

class Companies extends Controller
{

    private CompaniesRepository $CompaniesRepository;

    public function __construct(CompaniesRepository $repositoryCompanies)
    {
        $this->CompaniesRepository = $repositoryCompanies;
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('companies.index', [
            'page_title' => '-> Firmy',
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index_ajax()
    {
        return $this->CompaniesRepository->ajax();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('companies.edit', [
            'page_title' => '-> Dodanie Firmy',
            'mode' => 'create',
            'company' => new CompaniesModel,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return view('companies.edit', [
            'page_title' => '-> Edycja Firmy',
            'mode' => 'edit',
            'company' => $this->CompaniesRepository->get($id),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompaniesCreate $request)
    {
        $request->validated();

        $data = $request->post();

        CompaniesModel::create($data);

        return redirect()
            ->route('companies.index')
            ->with('success', 'Poprawnie dodano firmę ' . $data['name_complete'] . '.');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CompaniesUpdate $request, string $id)
    {
        $request->validated();

        $data = $request->post();

        $company = CompaniesModel::find($id);
        $company->update($data);

        return redirect()
            ->route('companies.index')
            ->with('success', 'Poprawnie zedytowano dane firmy ' . $data['name_complete'] . '.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return 'tffffest';
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if ($this->CompaniesRepository->canBeRemoved($id)) {
            $company = CompaniesModel::find($id);
            $company->delete();
            return redirect()
                ->route('companies.index')
                ->with('warning', 'Poprawnie usunieto firmę.');
        } else {
            return redirect()
                ->route('companies.index')
                ->with('error', 'Nie usunięto firmy - Do firmy przypisani są pracownicy bądź stanowiska.');
        }
    }
}
