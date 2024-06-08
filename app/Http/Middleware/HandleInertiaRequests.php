<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Inertia\Inertia;
use App\Models\Car;
use App\Models\Maintenance;
use App\Models\Photo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = config('app.locale');
        $json = lang_path("{$locale}.json");
        $content = file_get_contents($json);
        $translations = json_decode($content, true);

        if (Auth::check()) {
            $userId = Auth()->user()->id;
            $cars = Car::where('user_id', $userId)->get();
        }else{
            $cars = [];
        };

        if($cars){
            $carIds = $cars->pluck('id')->toArray();
            $maintenances = Maintenance::whereIn('car_id',$carIds)->get();
            $photos = Photo::whereIn('car_id',$carIds)->get();
        }else{
            $maintenances = [];
            $photos = [];
        }


        return [
            ...parent::share($request),
            'translations' => $translations,
            'auth' => [
                'user' => $request->user(),
            ],
            'cars' => $cars,
            'maintenances' => $maintenances,
            'photos' => $photos,
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'error' => session('error'),
            ],
        ];
        
    }
}
