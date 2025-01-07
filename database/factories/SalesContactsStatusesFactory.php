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
        return [
            'sales_contacts_id' => fake()->numberBetween(1, 200),
            'user_id' => fake()->numberBetween(1, 20),
            'description' => fake()->sentence(),
            'created_at' => now(),
            'updated_at' => now(),

        ];
    }
}
