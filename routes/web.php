<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

// -------------- Companies --------------
Route::resource('companies', Companies::class);
Route::post('companies/ajax', [Companies::class, 'index_ajax'])->name('companies.ajax');

// -------------- Employees --------------
Route::resource('companies.employees', CompaniesEmployees::class)->where(['id' => '[0-9]+'])->shallow();
Route::post('companies/{id}/employees/ajax', [CompaniesEmployees::class, 'index_ajax'])->where(['id' => '[0-9]+'])->name('companies.employees.ajax');



// -------------- Quest --------------
Route::middleware(['guest'])->group(function () {
});

// -------------- Loged --------------
Route::middleware(['auth'])->group(function () {
});
