<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    use HasFactory;

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    protected $fillable = [
        'car_id',
        'maintenance_details',
        'date',
        'next_time',
        'amount',
        'total_mileage',
        'inspection_type',
        'shop',
        'remarks',
];
}
