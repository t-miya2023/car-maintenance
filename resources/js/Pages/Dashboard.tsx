import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Route,  Routes } from 'react-router-dom';
import { Home } from './Home';
import { Report } from './Report';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page404 } from './Page404';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Router>
                <Routes>
                    <Route path="/car-maintenance/public/dashboard" element={<Home />} />
                    <Route path="car-maintenance/public/dashboard/report" element={<Report />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Router>
        </AuthenticatedLayout>
        
    );
}
