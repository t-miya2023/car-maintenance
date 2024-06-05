import { Box } from '@mui/material';
import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <Box sx={{
            height: "auto",
            width: { xs: '200px', sm: '200px', md: '200px', lg: '300px' }, 
            mx: 'auto',
            }}
            component="img"src="/images/logo.svg" alt="logo">
        </Box>

    );
}
