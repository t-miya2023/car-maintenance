<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CarController;
use App\Http\Controllers\MaintenanceController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
// 

Route::get('/home', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth')->prefix('car')->group(function () {
    Route::post('/store', [CarController::class, 'store'])->name('car.store');
    Route::put('/update/{id}', [CarController::class, 'update'])->name('car.update');
    Route::delete('/destroy/{id}', [CarController::class, 'destroy'])->name('car.destroy');
});

Route::middleware('auth')->prefix('maintenance')->group(function () {
    Route::post('/store', [MaintenanceController::class, 'store'])->name('maintenance.store');
    Route::put('/update/{id}', [MaintenanceController::class, 'update'])->name('maintenance.update');
    Route::delete('/destroy/{id}', [MaintenanceController::class, 'destroy'])->name('maintenance.destroy');
});

require __DIR__.'/auth.php';
