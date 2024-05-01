<?php

namespace App\Http\Controllers;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth()->user()->id;
        $cars = Car::where('user_id', $userId)->get();

        return Inertia::render('Dashboard', [
            'cars' => $cars
        ]);
    }


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
            'color' => 'nullable'
        ]);

        $data = $request->all();
        $data['user_id'] = auth()->id();
        Car::create($data);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::find($id);

        return Inertia::render('Car/Show', [
            'car' => $car
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $car = Car::find($id);

        return Inertia::render('Car/Edit', [
            'car' => $car
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'car_model' => 'required|max:50',
            'vehicle_model' => 'nullable',
            'grade' => 'nullable',
            'model_year' => 'nullable',
            'color' => 'nullable'
        ]);

        $car = Car::find($id);
        $car->update($data);

        return redirect()->route('car.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::find($id);
        $car->delete();

        return redirect()->route('car.index')->with('success', '削除に成功しました');
    }
}
