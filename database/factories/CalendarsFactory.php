<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \DateInterval;

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
        $date_start = fake()->dateTimeBetween('-2 years', '+6 months');

        $date_end = clone $date_start;
        $date_end_seconds = fake()->numberBetween(1, 59);
        $date_end_minutes = fake()->numberBetween(1, 59);
        $date_end_hours = fake()->numberBetween(1, 23);
        $date_end_days = fake()->numberBetween(1, 3);


        $date_end->add(new DateInterval('PT' . $date_end_seconds . 'S'));
        $date_end->add(new DateInterval('PT' . $date_end_minutes . 'M'));
        $date_end->add(new DateInterval('PT' . $date_end_hours . 'H'));
        $date_end->add(new DateInterval('P' . $date_end_days . 'D'));

        return [
            'user_id' => fake()->numberBetween(1, 20),
            'companies_employees_id' => fake()->numberBetween(1, 200),
            'description' => fake()->sentence(),
            'start' => $date_start,
            'end' => $date_end,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
