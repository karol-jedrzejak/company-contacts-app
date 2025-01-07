<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class CompaniesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company();
        return [
            'nip' => fake()->unique()->randomNumber(5, true) . fake()->unique()->randomNumber(5, true),
            'name_short' => $name,
            'name_complete' => $name . ' ' . fake()->companySuffix(),
            'adress_number' => fake()->numberBetween(1, 250),
            'adress_street' => fake()->streetName(),
            'adress_city' => fake()->city(),
            'adress_postcode' => fake()->numberBetween(10000, 99999),
            'country' => fake()->country(),
            'coordinate_latitude' => fake()->latitude($min = 35, $max = 48),
            'coordinate_longitude' => fake()->longitude($min = -120, $max = -95),
            'active' => fake()->numberBetween(0, 1),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
