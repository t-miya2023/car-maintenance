<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

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

        return [
            ...parent::share($request),
            'translations' => $translations,
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
