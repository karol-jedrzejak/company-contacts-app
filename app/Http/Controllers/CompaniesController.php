<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Companies;
use App\Models\CompaniesEmployees;

use Inertia\Inertia;
use Inertia\Response;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Companies::get();
        return Inertia::render('Companies/Index', ['items' => $companies, 'new_item' => new Companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $numer_of_emplyees = CompaniesEmployees::InCompany($id)->count();
        if ($numer_of_emplyees == 0) {
            Companies::find($id)->delete();
            return response()->json([
                'state' => 'destroy'
            ]);
        } else {
            return response()->json([
                'state' => 'error-employees'
            ]);
        }
    }
}
