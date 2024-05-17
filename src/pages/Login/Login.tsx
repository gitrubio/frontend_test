import React from 'react'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { Container } from '@mantine/core'
import classes from './login.module.css'
export default function Login() {
  return (
    <Container className={classes.container}   >
        <LoginForm maw={400} />
    </Container>
  )
}
