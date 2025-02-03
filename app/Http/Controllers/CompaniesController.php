<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Companies;
use App\Http\Requests\CompaniesStoreRequest;
use App\Http\Requests\CompaniesUpdateRequest;
use \stdClass;
use Inertia\Inertia;
use Inertia\Response;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Companies/Index', ['items' => Companies::get(), 'new_item' => new Companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Companies/Create', ['item' => new Companies, 'mode' => 'add']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CompaniesStoreRequest $request)
    {
        $request->validated();
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
        return Inertia::render('Companies/Create', ['item' => Companies::find($id), 'mode' => 'edit']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CompaniesUpdateRequest  $request, string $id)
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
