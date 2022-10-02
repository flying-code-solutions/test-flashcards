import { useEffect, useState } from "react";
import { Form, Dropdown, Segment, Rail, Button, Header } from "semantic-ui-react";
import useKeypress from "react-use-keypress";

// todo replace with a call to BE or getServerSideProps
const options = [
  { key: "0", text: "TestStack1", value: "TestStack1" },
  { key: "1", text: "TestStack2", value: "TestStack2" },
  { key: "2", text: "TestStack3", value: "TestStack3" }
]

const cardArr = [
  { title: "Title 1", content: "Content 1" },
  { title: "Title 2", content: "Content 2" },
  { title: "Title 3", content: "Content 3" }
]

function Practice() {
  const [stacks, setStacks] = useState(options);
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

  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     console.log('User pressed: ', event.key);
  //     if (isPractice) {
  //       console.log(event.key == "ArrowRight");
  //       if (event.key == "ArrowRight") {
  //         handleCardChange("next");
  //       } else if (event.key == "ArrowLeft") {
  //         handleCardChange("prev");
  //       }
  //     }
  //   };

  //   document.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);

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
      console.log(cardIndex);
      if (cardIndex !== cards.length - 1) {
        console.log(cardIndex);
        setCardIndex(prev => prev + 1);
      }
    } else {
      console.log("inLeft");
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

  return <>
    <Header content="Practice Setup" icon="settings" />
    <Form onSubmit={startPractice}>
      <Form.Select
        fluid
        label="Stack"
        placeholder="Select stack" 
        options={stacks}
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

export default Practice;