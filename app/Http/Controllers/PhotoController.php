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

        $image_path = $request->file('path')[0]->store('public/car_img/');
        $data['path'] = basename($image_path);
        
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
