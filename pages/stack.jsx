import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Segment, Button, Card } from "semantic-ui-react";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

const BLANK_CARD = {
  title: "",
  content: ""
}

function Stack() {
    const [cardData, setCardData] = useState(BLANK_CARD);
    const [cards, setCards] = useState([]);
    const router = useRouter();
    const { id: stackId } = router.query;

    useEffect(() => {
        async function getCards() {
            const { token } = parseCookies();
            const url = `${baseUrl}/api/cards`;
            const payload = {
                params: { stackId },
                headers: { Authorization: token }
            }
            const { data } = await axios.get(url, payload);
            setCards(data);
        }

        getCards();
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setCardData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const { token } = parseCookies();
            const url = `${baseUrl}/api/cards`;
            const headers = { headers: { Authorization: token } }
            const payload = {
                stackId,
                cardData
            }
            const { data } = await axios.post(url, payload, headers);
            setCards(prev => [...prev, data]);
            setCardData(BLANK_CARD);
        } catch (error) {
            console.error(error);
        }
    }

    function mapCardsToItems(stacks) {

        // todo add description to model and to form
        return cards.map(card => ({
        header: card.title,
        // meta: `${stack.cards.length} cards`,
        content: card.content,
        fluid: true,
        childKey: card._id
        // extra: (
        //     <>
        //     <Button
        //         primary
        //         icon="settings"
        //         floated="right"
        //         onClick={() => router.push(`/import?stack=${stack._id}`)}
        //     />
        //     <Button
        //         color="red"
        //         icon="trash"
        //         floated="right"
        //         onClick={() => deleteStack(stack._id)}
        //     />
        //     </>
        // )
        }));
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Segment>
                <Form.Input 
                fluid
                name="title"
                placeholder="Card title"
                label="Title"
                onChange={handleChange}
                value={cardData.title}
                />
                <Form.Input
                fluid
                name="content"
                placeholder="Card content"
                label="Content"
                onChange={handleChange}
                value={cardData.content}
                />
                <Button type="submit" color="purple" content="Save" />
            </Segment>
        </Form>
        <Card.Group
            items={mapCardsToItems(cards)}
            centered
            stackable
            itemsPerRow="3"
        />
    </>;
}

export default Stack;