<?php

namespace App\Http\Controllers;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'car_model' => 'required|max:50',
            'vehicle_model' => 'nullable',
            'grade' => 'nullable',
            'model_year' => 'nullable',
            'color' => 'nullable',
            'img' => 'nullable',
        ]);



        $data = $request->all();
        $data['user_id'] = auth()->id();

        if ($request->hasFile('img')) {
            $image_path = $request->file('img')->store('public/car_img/');
            $data['img'] = basename($image_path);
        } 
        // dd($data);
        Car::create($data);

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'car_model' => 'required|max:50',
            'vehicle_model' => 'nullable',
            'grade' => 'nullable',
            'model_year' => 'nullable',
            'color' => 'nullable',
            'img' => 'nullable',
        ]);

        $car = Car::find($id);
        $car->update($data);
        return redirect()->back();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $car = Car::find($id);
        $car->delete();

        return redirect()->back()->with('success', '削除に成功しました');
    }
}
