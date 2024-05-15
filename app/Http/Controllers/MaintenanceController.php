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
    public function update(Request $request, $id)
    {
        $data = $request->validate([
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

        $maintenance = Maintenance::find($id);
        $maintenance->update($data);
        
        return redirect()->back()->with('success', '更新に成功しました');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $maintenance = Maintenance::find($id);
        $maintenance->delete();

        return redirect()->back()->with('success', '削除に成功しました');
    }
}
