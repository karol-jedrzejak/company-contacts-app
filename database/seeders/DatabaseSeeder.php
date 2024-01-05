<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            UserSeeder::class,
            CompaniesSeeder::class,
            CalendarsSeeder::class,
            SalesContactsStatusesSeeder::class,
        ]);
    }
}
