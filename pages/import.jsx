import { useState } from "react";
import { Segment, Header, Icon, Form, Button } from "semantic-ui-react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

import baseUrl from "../utils/baseUrl";
import connectDb from "../../test-shop/utils/connectDb";
import Stack from "../models/Stack";

function Import({ stacks }) {
    const [selectedStack, setSelectedStack] = useState("");

    function handleStackChange(event, { value }) {
        setSelectedStack(value);
    }

    function mapStacksToDropdownItems(data) {
        const stackArr = data.map(item => ({
            key: item._id,
            text: item.name,
            value: item._id,
            cards: item.cards
        }));
        stackArr.push({
            key: "new",
            text: "Create New Stack",
            value: "new",
        });
        return stackArr;
    }

    function handleFileSelect(event) {
        if (!event.target.files?.length) {
            return;
        }

        console.log(event.target.files);

        const formData = new FormData();

        formData.append(event.target.name, event.target.files[0]);

        console.log(formData);
    }

    async function handleImport() {
        // todo
    }

    return (
        // <Segment placeholder>
        //     <Header icon>
        //     <Icon name='pdf file outline' />
        //     Drop a file here.
        //     </Header>
        //     <Button primary>Search</Button>
        // </Segment>
        <>
            <Header content="Import Cards" icon="settings" />
            <Form onSubmit={handleImport}>
                <Form.Select
                    fluid
                    label="Stack"
                    placeholder="Select stack" 
                    options={mapStacksToDropdownItems(stacks)}
                    onChange={handleStackChange}
                    value={selectedStack}
                />
                <Form.Input 
                    name="stackName"
                    label="Stack Name"
                    placeholder="Stack Name"
                />
                <Form.Input 
                    type="file"
                    label="File"
                    name="file"
                    accept="xlsx"
                    onChange={handleFileSelect}
                />
                <Button
                    type="submit"
                    primary
                    content="Import"
                />
            </Form>
        </>
    );
}

export async function getServerSideProps(ctx) {
  connectDb();

  const { token } = parseCookies(ctx);
  const { userId } = jwt.verify(token, process.env.JWT_SECRET);

  const stacks = await Stack.find({ user: userId });
  
  return {
    props: {
      stacks: JSON.parse(JSON.stringify(stacks))
    }
  };
}

export default Import;