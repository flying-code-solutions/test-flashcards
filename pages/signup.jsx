import { useEffect, useState } from "react";
import { Form, Button, Segment, Message } from "semantic-ui-react";
import axios from "axios";

import baseUrl from "../utils/baseUrl";
import { handleLogin } from "../utils/auth";
import catchErrors from "../utils/catchErrors";

const BLANK_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
  const [userData, setUserData] = useState(BLANK_USER);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (userData.name && userData.email && userData.password) {
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
      const url = `${baseUrl}/api/signup`;
      const payload = userData;
      const { data } = await axios.post(url, payload);
      handleLogin(data);
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
        <Message.Content>Your account has been created.</Message.Content>
      </Message >}
      {errorMsg && <Message attached error>
        <Message.Header>Error</Message.Header>
        <Message.Content>{errorMsg}</Message.Content>
      </Message >}
      <Form loading={loading} onSubmit={handleSubmit}>
        <Segment>
          <Form.Input 
            fluid
            name="name"
            placeholder="Name"
            label="Name"
            onChange={handleChange}
            required
            value={userData.name}
          />
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
          <Button disabled={loading || !valid} type="submit" color="purple" content="Sign Up" />
        </Segment>
      </Form>
    </>
  );
}

export default Signup;