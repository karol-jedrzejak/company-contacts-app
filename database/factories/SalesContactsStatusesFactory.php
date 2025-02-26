<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SalesContactsStatuses>
 */
class SalesContactsStatusesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date =
            fake()->dateTimeBetween('-2 years', '-1 day');
        return [
            'user_id' => fake()->numberBetween(1, 20),
            'description' => fake()->sentence(),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
