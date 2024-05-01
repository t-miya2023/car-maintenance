import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Route,  Routes } from 'react-router-dom';
import { Home } from './Home';
import { Report } from './Report';
import { BrowserRouter as Router } from 'react-router-dom';
import { Page404 } from './Page404';
import AppLayout from '@/Layouts/AppLayout';
import { CarProvider } from '@/Providers/CarProvider';

export default function Dashboard({ auth }: PageProps) {
    return (
        <CarProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout user={auth.user} />}>
                        <Route path='/home' element={<Home />} />
                        <Route path="/report" element={<Report />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                </Routes>
            </Router>
        </CarProvider>
        
    );
}
