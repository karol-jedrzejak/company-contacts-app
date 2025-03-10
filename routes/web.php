<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TasklistsController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\CompaniesEmployeesController;
use App\Http\Controllers\CalendarsController;
use App\Http\Controllers\SalesContactsController;
use App\Models\SalesContacts;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('tasklists', TasklistsController::class);

    Route::resource('companies', CompaniesController::class);
    Route::resource('companies.employees', CompaniesEmployeesController::class)->where(['id' => '[0-9]+'])->shallow();

    Route::resource('calendars', CalendarsController::class);
    Route::resource('sales_contacts', SalesContactsController::class);
});

require __DIR__ . '/auth.php';
