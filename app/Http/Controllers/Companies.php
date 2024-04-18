<?php

namespace App\Http\Controllers;

use App\Models\Companies as CompaniesModel;
use App\Repository\Companies\CompaniesRepository;

//use App\Http\Requests\Companies\Create as CompaniesCreate;
//use App\Http\Requests\Companies\Update as CompaniesUpdate;

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
        return 'creatsdfsdfess';
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return 'test';
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return 'tffffest';
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return 'test';
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return 'test2';
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return 'test3';
    }
}
