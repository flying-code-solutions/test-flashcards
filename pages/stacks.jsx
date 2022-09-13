// import Stack from "../models/Stack";
import { useState } from "react";
import { Form, Header, Button } from "semantic-ui-react";

function Stacks() {
  const [stackName, setStackName] = useState("");

  function handleChange(event) {
    setStackName(event.target.value);
  }

  return (
    <>
      <Header icon="add" content="Create New Stack" />
      <Form>
        <Form.Input 
          name="name"
          label="Name"
          placeholder="Name"
          onChange={handleChange}
          value={stackName}
        />
        <Button type="submit" color="purple" content="Create" />
      </Form>
    </>
    );
}

export default Stacks;

// export async function getServerSideProps(ctx) {
//   const stacks = await Stack.find({});

//   return {
//     props: {
//       stacks
//     }
//   }
// }