<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SalesContacts;
use App\Models\SalesContactsStatuses;

class SalesContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SalesContacts::factory()
            ->count(20)->has(SalesContactsStatuses::factory()->count(10))
            ->create();
    }
}
