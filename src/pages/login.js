import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Image } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';

const Login = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: 'demo@devias.io',
            password: 'Password123'
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: () => {
            router.push('/');
        }
    });

    return (
        <>
            <Container maxWidth="sm" >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={3}>
                        <Card sx={{ minWidth: 300, width: 400 }}>
                            <Head>
                                <title>Login | Material Kit</title>
                            </Head>
                            <Box
                                component="main"
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexGrow: 1,
                                    minHeight: '100%'
                                }}
                            >
                                <Container maxWidth="sm">
                                    {/* <NextLink
                        href="/"
                        passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NextLink> */}
                                    <form onSubmit={formik.handleSubmit}>
                                        <Box justifyContent="center" sx={{ pt: 5 }}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h5"
                                                fullWidth
                                                align="center"
                                            >
                                                Master Data
                                            </Typography>
                                            <Typography
                                                color="textPrimary"
                                                variant="h6"
                                                fullWidth
                                                align="center"
                                            >
                                                PT Lautan Luas Tbk
                                            </Typography>
                                        </Box>
                                        <Box justifyContent="center" display="flex">
                                            <img src="/images/logos/lautan_luas.png" width="150" height="150" />
                                        </Box>
                                        <TextField
                                            error={Boolean(formik.touched.email && formik.errors.email)}
                                            fullWidth
                                            helperText={formik.touched.email && formik.errors.email}
                                            label="Email Address"
                                            margin="normal"
                                            name="email"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="email"
                                            value={formik.values.email}
                                            variant="outlined"
                                        />
                                        <TextField
                                            error={Boolean(formik.touched.password && formik.errors.password)}
                                            fullWidth
                                            helperText={formik.touched.password && formik.errors.password}
                                            label="Password"
                                            margin="normal"
                                            name="password"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="password"
                                            value={formik.values.password}
                                            variant="outlined"
                                        />
                                        <Box sx={{ py: 2 }}>
                                            <Button
                                                color="primary"
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Sign In Now
                                            </Button>
                                        </Box>
                                        {/* <Typography
                                            color="textSecondary"
                                            variant="body2"
                                        >
                                            Don&apos;t have an account?
                                            {' '}
                                            <NextLink
                                                href="/register"
                                            >
                                                <Link
                                                    to="/register"
                                                    variant="subtitle2"
                                                    underline="hover"
                                                    sx={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Sign Up
                                                </Link>
                                            </NextLink>
                                        </Typography> */}
                                    </form>
                                </Container>
                            </Box>
                        </Card>
                    </Grid>

                </Grid>

            </Container>

        </>
    );
};

export default Login;
