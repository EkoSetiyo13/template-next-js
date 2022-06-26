import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Card, Button, Container, Grid, Link, TextField, Typography, Image } from '@mui/material';
import { useUser } from '@lib/hooks'
import { useState, useEffect } from 'react'
import _ from 'lodash'
import { PropagateLoader } from "react-spinners";

const Login = () => {
    useUser({ redirectTo: '/dashboard', redirectIfFound: true })
    const user = useUser()
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        console.log('user', _.isUndefined(user))
        if(!_.isUndefined(user)) {
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
    }, [user])



    async function handleSubmit(e) {
  
        const body = {
          username: e.username,
          password: e.password,
        }
    
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          if (res.status === 200) {
            router.push('/dashboard');
          } else {
            throw new Error(await res.text())
          }
        } catch (error) {
          console.error('An unexpected error happened occurred:', error)
        }
      }

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            // email: 'demo@devias.io',
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            // email: Yup
            //     .string()
            //     .email(
            //         'Must be a valid email')
            //     .max(255)
            //     .required(
            //         'Email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: (e) => {
            handleSubmit(e)
        }
    });

    if(loading) {
       return( 
        <Box 
            display="flex" 
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}

        >
             <PropagateLoader color={'#2596be'} loading={loading} size={20} />
        </Box>
        );
    }

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
                                        {/* <TextField
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
                                        /> */}
                                        <TextField
                                            error={Boolean(formik.touched.username && formik.errors.username)}
                                            fullWidth
                                            helperText={formik.touched.username && formik.errors.username}
                                            label="username"
                                            margin="normal"
                                            name="username"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            type="text"
                                            value={formik.values.username}
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
