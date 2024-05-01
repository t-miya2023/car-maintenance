<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\Car;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('CarProvider', function () {
            $userId = Auth()->user()->id;
            $cars = Car::where('user_id', $userId)->get();
            return $cars;
        });
    }
}
