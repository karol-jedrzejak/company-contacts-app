<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tasklists>
 */
class TasklistsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(),
            'importance' => fake()->randomElement(['high', 'medium', 'low']),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
