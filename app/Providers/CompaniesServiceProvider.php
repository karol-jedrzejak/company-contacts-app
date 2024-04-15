<?php

namespace App\Providers;

use App\Repository\Companies\Builder\CompaniesRepository;
//use App\Repository\Companies\Builder\CompaniesEmployeesRepository;
use App\Repository\Companies\CompaniesRepository as CompaniesInterfaceRepository;
//use App\Repository\Companies\CompaniesEmployeesRepository as CompaniesEmployeesInterfaceRepository;


use Illuminate\Support\ServiceProvider;

class CompaniesServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(CompaniesInterfaceRepository::class, CompaniesRepository::class);
        //$this->app->bind(CompaniesEmployeesInterfaceRepository::class, CompaniesEmployeesRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //dump('Fake - boot');
    }
}
