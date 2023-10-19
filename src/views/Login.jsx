import {
  Container,
  Grid,
  Card,
  Form,
  Input,
  Button,
  Message,
} from "semantic-ui-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../lib/http";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [wrongCreds, setWrongCreds] = useState(false);

  async function login() {
    const api = http();
    try {
      const body = {
        username,
        password,
      };
      const response = await api.post("/login", body);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      setErrors({
        username: false,
        password: false,
      });
      setWrongCreds(false);
      if (error.response.status === 422) {
        const findErrors = Object.keys(error.response.data.errors).reduce(
          (a, key) => {
            return {
              ...a,
              [key]: {
                content: error.response.data.errors[key][0],
                pointing: "below",
              },
            };
          },
          {}
        );
        setErrors({
          username: findErrors.username || false,
          password: findErrors.password || false,
        });
      }
      if (error.response.status === 403) {
        setWrongCreds(true);
      }
    }
  }
  return (
    <Container style={{ marginTop: "5rem" }}>
      <Grid centered columns={2}>
        <Grid.Column>
          <Card style={{ width: "100%" }}>
            <Card.Content>
              <Card.Header>Login</Card.Header>
            </Card.Content>
            <Card.Content>
              <Form error={wrongCreds}>
                <Form.Field
                  control={Input}
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  error={errors.username}
                />
                <Form.Field
                  control={Input}
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <Message
                  error
                  header="Incorrect Credentials"
                  content="Please check your credentials and try again"
                />
              </Form>
            </Card.Content>
            <Card.Content
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button as={Link} to="/register" basic primary>
                Register
              </Button>
              <Button primary style={{ margin: 0 }} onClick={login}>
                Login
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Login;
