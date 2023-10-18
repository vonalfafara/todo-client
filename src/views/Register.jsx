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

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  async function register() {
    const api = http();
    try {
      const body = {
        username,
        email,
        password,
        password_confirmation,
      };
      const response = await api.post("/register", body);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      setErrors({
        username: false,
        email: false,
        password: false,
      });
      if (error.response.status === 422) {
        setErrors({
          username: {
            content: error.response.data.errors?.username[0],
            pointing: "below",
          },
          email: {
            content: error.response.data.errors?.email[0],
            pointing: "below",
          },
          password: {
            content: error.response.data.errors?.password[0],
            pointing: "below",
          },
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
              <Card.Header>Register</Card.Header>
            </Card.Content>
            <Card.Content>
              <Form>
                <Form.Field
                  control={Input}
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  error={errors.username}
                />
                <Form.Field
                  control={Input}
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <Form.Field
                  control={Input}
                  label="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                />
                <Form.Field
                  control={Input}
                  label="Confirm Password"
                  type="password"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  error={errors.password}
                />
              </Form>
            </Card.Content>
            <Card.Content
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button as={Link} to="/login" basic primary>
                Login
              </Button>
              <Button primary style={{ margin: 0 }} onClick={register}>
                Register
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Register;
