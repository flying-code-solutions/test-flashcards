// import Stack from "../models/Stack";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Form, Card, Header, Button } from "semantic-ui-react";
import axios from "axios";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

function Stacks() {
  const [stackName, setStackName] = useState("");
  const [stacks, setStacks] = useState([]);
  const router = useRouter();

  const url = `${baseUrl}/api/stacks`;

  useEffect(() => {
    async function getStacks() {
      try {
        const payload = {
          headers: { Authorization: token }
        }
        const { data } = await axios.get(url, payload);
        setStacks(data);
      } catch (error) {
        console.error(error);
      }
    }

    getStacks();
  }, []);

  function handleChange(event) {
    setStackName(event.target.value);
  }

  async function handleSubmit() {
    try {
      const payload = {
        headers: { Authorization: token },
        stackName
      }
      const {data} = await axios.post(url, payload);
      setStacks(prev => [...prev, data]);
      setStackName("");
    } catch (error) {
      console.error(error);
    }
  }

  function mapStacksToItems(stacks) {

    // todo add description to model and to form
    return stacks.map(stack => ({
      header: stack.name,
      meta: `${stack.cards.length} cards`,
      fluid: true,
      childKey: stack._id,
      href: `${baseUrl}/stack?id=${stack._id}`,
      extra: (
        <>
          <Button
            basic
            icon="add"
            floated="right"
            onClick={() => router.push(`/import?stack=${stack._id}`)}
          />
          <Button
            basic
            icon="remove"
            floated="right"
            onClick={() => deleteStack(stack._id)}
          />
        </>
      )
    }));
  }

  // todo move this to StackList component once created
  async function deleteStack(id) {
    try {
      const { token } = parseCookies();
      const url = `${baseUrl}/api/stacks`;
      const payload = {
        params: { id },
        headers: {
          Authorization: token
        }
      };
      await axios.delete(url, payload);
      setStacks(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    } 
  }
  

  return (
    <>
      <Header icon="add" content="Create New Stack" />
      <Form onSubmit={handleSubmit}>
        <Form.Input 
          name="name"
          label="Name"
          placeholder="Name"
          onChange={handleChange}
          value={stackName}
        />
        <Button type="submit" color="purple" content="Create" />
      </Form>
      {/* todo move into a separate StackList component */}
      <Card.Group
        items={mapStacksToItems(stacks)}
        centered
        stackable
        itemsPerRow="3"
      />
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