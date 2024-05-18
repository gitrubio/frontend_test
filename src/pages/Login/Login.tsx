import React from 'react'
import { LoginForm } from '@/components/LoginForm'
import { Container } from '@mantine/core'
import classes from './login.module.css'
export default function Login() {
    return (
        <Container className={classes.container}>
            <div className={classes.area}>
                <ul className={classes.circles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
                <LoginForm maw={350} className={classes.form} />
        </Container>
    )
}
