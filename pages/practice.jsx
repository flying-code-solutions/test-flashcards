
import { useEffect, useState } from "react";
import { Form, Segment, Rail, Button, Header } from "semantic-ui-react";
import useKeypress from "react-use-keypress";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";

import Stack from "../models/Stack";
import connectDb from "../../test-shop/utils/connectDb";

const cardArr = [
  { title: "Title 1", content: "Content 1" },
  { title: "Title 2", content: "Content 2" },
  { title: "Title 3", content: "Content 3" }
]

function Practice({ stacks }) {
  const [selectedStack, setSelectedStack] = useState("");
  const [cards, setCards] = useState(cardArr);
  const [cardIndex, setCardIndex] = useState(null);
  const [currentCard, setCurrentCard] = useState({});
  const [isPractice, setIsPractice] = useState(false);

  useKeypress(["ArrowLeft", "ArrowRight"], (event) => {
    console.log('User pressed: ', event.key);
    if (isPractice) {
      console.log(event.key == "ArrowRight");
      if (event.key == "ArrowRight") {
        handleCardChange("next");
      } else if (event.key == "ArrowLeft") {
        handleCardChange("prev");
      }
    }
  });

  useEffect(() => {
    if (cardIndex !== null) {
      setCurrentCard(cards[cardIndex]);
    }
  }, [cardIndex]);

  function handleStackChange(event, { value }) {
    setSelectedStack(value);
  }

  function handleCardChange(dir) {
    if (dir === "next") {
      if (cardIndex !== cards.length - 1) {
        setCardIndex(prev => prev + 1);
      }
    } else {
      if (cardIndex !== 0) {
        setCardIndex(prev => prev - 1);
      }
    }
  }

  function startPractice(event) {
    event.preventDefault();
    setCardIndex(0);
    setIsPractice(true);
  }

  function mapStacksToDropdownItems(data) {
    return data.map(item => ({
      key: item._id,
      text: item.name,
      value: item.name,
      cards: item.cards
    }));
  }
    
  return <>
    <Header content="Practice Setup" icon="settings" />
    <Form onSubmit={startPractice}>
      <Form.Select
        fluid
        label="Stack"
        placeholder="Select stack" 
        options={mapStacksToDropdownItems(stacks)}
        onChange={handleStackChange}
        value={selectedStack}
      />
      <Button
        type="submit"
        primary
        content="Start Practice"
      />
    </Form>
    <Segment style={{minHeight: "400px"}} textAlign='center' >
      <Header as="h1" content={currentCard.title} />
      <p>{currentCard.content}</p>

        <Rail style={{width: "auto"}} internal attached position='left' size="mini">
          <Button
            style={{ margin: "0.5rem" }}
            basic
            circular
            icon="angle left"
            onClick={() => handleCardChange("prev")}
          />
        </Rail>

        <Rail style={{width: "auto"}} internal attached position='right'>
          <Button
            style={{ margin: "0.5rem" }}
            basic
            circular
            icon="angle right"
            onClick={() => handleCardChange("next")}
          />
        </Rail>
      </Segment>
  </>;
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

export default Practice;