import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react'
import getInitialProps from '../../services/verifyLogin';
import axios from 'axios'
import BounceLoader from "react-spinners/BounceLoader";

const Login = ({ messsageLogin, isLogin }) => {
    const [loginStatus, setLoginStatus] = useState(isLogin || 'Loading...');
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#2A90E7");
    async function getLoginStatus() {
        setLoginStatus('Loading...')

        try {
            const { email } = await axios.get('/api/proxy/contoh/me').then((response) => response.data)

            setLoginStatus(`Logged in as ${email}`)
        } catch (err) {
            setLoginStatus('Not logged in')
        }
    }

    useEffect(() => {
        console.log('aa', isLogin)
        if (!isLogin) {
            getLoginStatus()
        }
        setTimeout(() => { setLoading(false) }, 150)
    }, [isLogin]);

    async function onSubmit(data) {

        try {
            await axios.post('/api/proxy/auth/login', data)

            getLoginStatus()
            router.push('/');
        } catch (err) {
            console.error('Request failed:' + err.message)
            getLoginStatus()
        }
    }

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: 'admin@example.com',
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
        onSubmit: (values, actions) => {
            // console.log(values, actions)
            onSubmit(values)
            // router.push('/');
        }
    });

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: "50%",
                marginTop: '-50px',
                marginLeft: "-100px",
            }}>
                <BounceLoader color={color} loading={loading} size={150} />
            </div>
        )
    }

    return (
        <>
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
                    <NextLink
                        href="/"
                    // passHref
                    >
                        <Button
                            component="a"
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Dashboard
                        </Button>
                    </NextLink>
                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Sign in
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                pb: 1,
                                pt: 3
                            }}
                        >
                            <Typography
                                align="center"
                                color="textSecondary"
                                variant="body1"
                            >
                                or login with email address
                            </Typography>
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
                                // disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign In Now
                            </Button>
                        </Box>
                        <Typography
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
                        </Typography>
                    </form>
                </Container>
            </Box>
        </>
    );
};

Login.getInitialProps = getInitialProps;
export default Login;
