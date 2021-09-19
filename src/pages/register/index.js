
import {
    Container,
    Wrapper,
    LeftConatainer,
    Logo,
    LoginDescription,
    RightContainar,
    LoginBox,
    Input,
    LoginButton,
    RegisterButton

} from './style/register'
import { useHistory } from "react-router"
import { useRef } from "react";
import { Link } from "react-router-dom"
import {Register} from "../../ApiCall"

export default function LoginPage() {
    const History = useHistory()
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const submitHandler = (e) => {
        e.preventDefault();
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");

        } else {
            Register(username.current.value,email.current.value,password.current.value)
            History.push('/login')
        }

    }

    return (
        <Container>
            <Wrapper>
                <LeftConatainer>
                    <Logo>Jixsocial</Logo>
                    <LoginDescription>
                        Connect with friends and the world around you on Jixsocial.
                    </LoginDescription>
                </LeftConatainer>
                <RightContainar>
                    <LoginBox onSubmit={submitHandler}>
                        <Input
                            placeholder="Username"
                            type="string"
                            ref={username}
                            required
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            required
                            ref={email}
                        />
                        <Input
                            placeholder="Password"
                            required
                            ref={password}
                            type="password"
                        />
                        <Input
                            placeholder="Re-enter password"
                            required
                            type="password"
                            ref={passwordAgain}
                        />
                        <LoginButton>Sign Up</LoginButton>
                        <Link to={'/login'}>
                            <RegisterButton type="submit">Log into Account</RegisterButton>
                        </Link>
                    </LoginBox>
                </RightContainar>
            </Wrapper>
        </Container>
    )
}
