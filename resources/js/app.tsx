import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

declare global {
  interface Window {
    __: (key: string, replace?: Record<string, unknown>) => string;
  }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const translations = Object(props.initialPage.props.translations);

        window.__ = (key: string, replace?: Record<string, unknown>): string => {
          let translatedText: string = translations[key] || key;
          for (const key in replace) {
            const replacedText = String(replace[key as keyof typeof replace]);
            translatedText = translatedText.replace(`:${key}`, replacedText);
          }
          return translatedText;
        };
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
