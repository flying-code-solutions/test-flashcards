import { useState } from "react";
import { Segment, Header, Icon, Form, Button } from "semantic-ui-react";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

import baseUrl from "../utils/baseUrl";
import connectDb from "../../test-shop/utils/connectDb";
import Stack from "../models/Stack";
import axios from "axios";

function Import({ stacks }) {
    const [selectedStack, setSelectedStack] = useState("");
    const [formData, setFormData] = useState(new FormData());

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

        formData.append(event.target.name, event.target.files[0]);
    }

    async function handleImport() {
        try {
            const url = `${baseUrl}/api/import`;
            const { token } = parseCookies();
            const headers = { headers: { Authorization: token } }
            formData.append("stackId", selectedStack);
            const response = await axios.post(url, formData, headers);
        } catch (error) {
            console.error(error);
        }
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
                    name="file"
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