<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Companies;
use App\Models\CompaniesEmployees;
use App\Models\SalesContacts;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class companiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Companies::factory()
            ->count(20)
            ->has(
                CompaniesEmployees::factory()
                    ->count(10)
            )
            ->create();
        /*         Companies::factory()
            ->count(20)
            ->has(
                CompaniesEmployees::factory()
                    ->count(10)->has(SalesContacts::factory()->count(1))
            )
            ->create(); */
    }
}
