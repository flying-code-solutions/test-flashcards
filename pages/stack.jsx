import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Segment, Button, Card, Header } from "semantic-ui-react";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

const BLANK_CARD = {
    titleFront: "",
    contentFront: "",
    titleBack: "",
    contentBack: ""
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

    function mapCardsToItems(cards) {

        // todo add description to model and to form
        return cards.map(card => ({
        header: card.titleFront,
        // meta: `${stack.cards.length} cards`,
        meta: card.contentFront,
        fluid: true,
        childKey: card._id,
        key: card._id
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
        <Header icon="add" content="Create New Card" />
        <Form onSubmit={handleSubmit}>
            <Segment>
                <Form.Input 
                fluid
                name="titleFront"
                placeholder="Title - front side"
                label="Title - front side"
                onChange={handleChange}
                value={cardData.titleFront}
                />
                <Form.Input
                fluid
                name="contentFront"
                placeholder="Content - front side"
                label="Content - front side"
                onChange={handleChange}
                value={cardData.contentFront}
                />
                <Form.Input 
                fluid
                name="titleBack"
                placeholder="Title - back side"
                label="Title - back side"
                onChange={handleChange}
                value={cardData.titleBack}
                />
                <Form.Input
                fluid
                name="contentBack"
                placeholder="Content - back side"
                label="Content - back side"
                onChange={handleChange}
                value={cardData.contentBack}
                />
                <Button type="submit" color="purple" content="Save" />
            </Segment>
        </Form>
        <Header icon="clone outline" content="Cards" style={{"marginTop": "4rem"}} />
        <Card.Group
            items={mapCardsToItems(cards)}
            stackable
            itemsPerRow="3"
        />
    </>;
}

export default Stack;