<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Companies;
use App\Models\CompaniesEmployees;

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
            ->has(CompaniesEmployees::factory()->count(10))
            ->create();

        /*         DB::table('users')->insert([
            'nip' => Str::random(10),
            'name_short' => Str::random(10),
            'name_complete' => Str::random(10),
            'adress_number' => Str::random(10),
            'adress_street' => Str::random(10),
            'adress_city' => Str::random(10),
            'adress_postcode' => Str::random(10),
            'country' => Str::random(10),
            'coordinate_NS' => Str::random(10),
            'coordinate_WE' => Str::random(10),
            'active' => Str::random(10),
            'created_at' => Str::random(10),
            'updated_at' => Str::random(10),

        ]); */
    }
}
