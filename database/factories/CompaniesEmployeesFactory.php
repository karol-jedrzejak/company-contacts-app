<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompaniesEmployees>
 */
class CompaniesEmployeesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'account',
            'manager',
            'worker',
            'project manager',
            'director',
            'manual worker',
        ];
        return [
            'name' => fake()->firstName(),
            'surname' => fake()->lastName(),
            'position' => fake()->randomElement($titles),
            'mobile' => fake()->phoneNumber(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->email(),
            'active' => fake()->numberBetween(0, 1),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
