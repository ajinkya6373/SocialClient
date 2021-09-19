
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
    ForgotPass,
    RegisterButton

} from './style/login'
import { useRef } from 'react';
import { useStateValue } from "../../context/AuthContext"
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom"
import ErrorIcon from '@material-ui/icons/Error';
import {loginCall} from "../../ApiCall"

export default function LoginPage() {
    const email = useRef();
    const password = useRef();
    const [{ isFetching, error }, dispatch] = useStateValue()

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
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
                    <LoginBox onSubmit={handleClick}>
                        <Input
                            placeholder="Email"
                            required
                            ref={email}
                        // type="email"
                        />
                        <Input
                            placeholder="Password"
                            required
                            ref={password}
                            // minLength="6"
                            type="password" />
                        <LoginButton disabled={isFetching} type="submit">
                            {isFetching ?
                                < CircularProgress color="white" size="20px" />
                                : error
                                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ErrorIcon htmlColor="#B00020" style={{ marginRight: "5px" }} /> Something wrong
                                </span>
                                : "Log in"
                            }
                        </LoginButton>
                        <ForgotPass>Forgot Password?</ForgotPass>
                        <Link to={'/register'}>
                        <RegisterButton>Create a New Account</RegisterButton>
                        </Link>
                    </LoginBox>
                </RightContainar>
            </Wrapper>
        </Container>
    )
}
