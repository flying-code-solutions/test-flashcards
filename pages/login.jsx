import { useEffect, useState } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

import { useAuth } from "../components/_App/AuthProvider";
import catchErrors from "../utils/catchErrors";

const BLANK_USER = {
  email: "",
  password: ""
}

function Login() {
  const [userData, setUserData] = useState(BLANK_USER);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    if (userData.email && userData.password) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [userData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      login(userData);
      setSuccess(true);
      setUserData(BLANK_USER);
    } catch (error) {
      catchErrors(error, setErrorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {success && <Message attached success>
        <Message.Header>Success!</Message.Header>
        <Message.Content>You have been logged in.</Message.Content>
      </Message >}
      {errorMsg && <Message attached error>
        <Message.Header>Error</Message.Header>
        <Message.Content>{errorMsg}</Message.Content>
      </Message >}
      <Form onSubmit={handleSubmit}>
        <Segment>
          <Form.Input 
            fluid
            name="email"
            placeholder="E-mail"
            label="E-mail"
            type="email"
            onChange={handleChange}
            required
            value={userData.email}
          />
          <Form.Input
            fluid
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            onChange={handleChange}
            required
            value={userData.password}
          />
          <Button disabled={loading || !valid} type="submit" color="purple" content="Log In" />
        </Segment>
      </Form>
    </>
  );
}

export default Login;