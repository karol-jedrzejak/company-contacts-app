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
        $data = $request->post();
        $data['id'] = null;
        $data['user_id'] = Auth::id();
        Companies::create($data);
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
