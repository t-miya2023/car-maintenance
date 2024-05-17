<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'car_id' => 'required',
            'path' => 'required',
            'comment' => 'nullable|max:100',
        ]);

        $data = $request->all();

        if ($request->hasFile('path')) {
            $image_path = $request->file('path')->store('public/car_img/');
            $data['path'] = basename($image_path);
        } 
        dd($data);
        dd($request->hasFile('path'));
        Photo::create($data);

        return redirect()->back();
    }

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Photo $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Photo $photo)
    {
        //
    }
}
