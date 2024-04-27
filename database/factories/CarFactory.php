<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'car_model' => fake()->text(30),
            'vehicle_model' => fake()->text(50),
            'grade' => fake()->text(50),
            'model_year' => fake()->text(5),
            'color' => fake()->text(20),
            'img' => fake()->text(100),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
// $table->id();
// $table->foreignId('user_id')->constrained()->cascadeOnDelete();
// $table->string('car_model',30);
// $table->string('vehicle_model',50)->nullable();
// $table->string('grade',50)->nullable();
// $table->string('model_year',10)->nullable();
// $table->string('color',20)->nullable();
// $table->string('img')->nullable();
// $table->timestamps();