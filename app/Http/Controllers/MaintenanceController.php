<?php

namespace App\Http\Controllers;

use App\Models\Maintenance;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required',
            'maintenance_details' => 'required|max:50',
            'date' => 'required',
            'next_time' => 'nullable',
            'amount' => 'required | max:10',
            'total_mileage' => 'nullable | max:10',
            'inspection_type' => 'required',
            'shop' => 'nullable',
            'remarks' => 'nullable',
        ]);

        $data = $request->all();
        Maintenance::create($data);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maintenance $maintenance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maintenance $maintenance)
    {
        //
    }
}
