<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calendars>
 */
class CalendarsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'user_id' => fake()->numberBetween(1, 20),
            'companies_employees_id' => fake()->numberBetween(1, 200),
            'description' => fake()->sentence(),
            'start' => fake()->dateTime(),
            'end' => fake()->dateTime(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
