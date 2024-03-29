<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Companies extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return 'test233dsfasdassdssdefsdfsdsds';
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
        return 'test';
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
