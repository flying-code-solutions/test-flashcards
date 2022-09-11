import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useState } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

const NEW_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
  const [userData, setUserData] = useState(NEW_USER);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    console.log(userData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Segment>
        <Form.Input 
          fluid
          name="name"
          placeholder="Name"
          label="Name"
          onChange={handleChange}
          value={userData.name}
        />
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
        <Button type="submit" color="purple" content="Sign Up" />
      </Segment>
    </Form>
  );
}

export default Signup;