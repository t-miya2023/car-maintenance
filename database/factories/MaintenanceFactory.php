<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use App\Models\Car;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Maintenance>
 */
class MaintenanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'car_id' => Car::factory(),
            'maintenance_details' => fake()->text(100),
            'date' => fake()->date(),
            'next_time' => fake()->date(),
            'total_mileage' => fake()->text(20),
            'inspection_type' => fake()->text(10),
            'shop' => fake()->text(20),
            'remarks' => fake()->text(100),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
// $table->id();
//             $table->foreignId('car_id')->constrained()->cascadeOnDelete();
//             $table->string('maintenance_details',100);
//             $table->date('date');
//             $table->date('next_time')->nullable();
//             $table->string('total_mileage');
//             $table->string('inspection_type')->nullable();
//             $table->string('shop')->nullable();
//             $table->string('remarks')->nullable();
//            $table->timestamps();
