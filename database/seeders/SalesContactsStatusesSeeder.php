<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SalesContactsStatuses;

class SalesContactsStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesContactsStatuses::factory()
            ->count(20)
            ->create();
    }
}
