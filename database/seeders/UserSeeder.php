<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Tasklists;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Default user
        DB::table('users')->insert([
            'name' => 'Test Person Name',
            'email' => 'test@test.com',
            'email_verified_at' => now(),
            'password' => Hash::make('test'),
            'remember_token' => Str::random(10),
        ]);

        for ($i = 0; $i < 50; $i++) {
            DB::table('tasklists')->insert([
                'user_id' => 1,
                'description' => fake()->sentence(),
                'importance' => fake()->randomElement(['high', 'medium', 'low']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        User::factory()
            ->count(19)
            ->has(Tasklists::factory()->count(50))->create();
    }
}
