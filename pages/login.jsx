import { useState } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

import { useAuth } from "../components/_App/AuthProvider";

const BLANK_USER = {
  email: "",
  password: ""
}

function Login() {
  const [userData, setUserData] = useState(BLANK_USER);
  const { login } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      login(userData);
      setUserData(BLANK_USER);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Segment>
        <Form.Input 
          fluid
          name="email"
          placeholder="E-mail"
          label="E-mail"
          type="email"
          onChange={handleChange}
          value={userData.email}
        />
        <Form.Input
          fluid
          name="password"
          placeholder="Password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={userData.password}
        />
        <Button type="submit" color="purple" content="Log In" />
      </Segment>
    </Form>
  );
}

export default Login;