import { useEffect, useState } from "react";
import Card from "./components/Card";
import { dataImg } from "./data.js";

function App() {
  const [turn, setTurn] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleStart = () => {
    const newDataImg = [...dataImg, ...dataImg]
      .sort(() => {
        return 0.5 - Math.random();
      })
      .map((item) => {
        return { ...item, id: Math.random() };
      });

    setTurn(0);
    setCards(newDataImg);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card.id) : setChoiceOne(card.id);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prev) => prev + 1);
    setDisable(false);
  };

  const choiceOneValue = cards.find((item) => item.id === choiceOne)?.value;
  const choiceTwoValue = cards.find((item) => item.id === choiceTwo)?.value;
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne !== choiceTwo) {
        setDisable(true);
        if (choiceOneValue === choiceTwoValue) {
          setCards((prev) =>
            prev.map((card) => {
              if (card.value === choiceOneValue) {
                return { ...card, match: true };
              }
              return card;
            })
          );
          resetTurn();
        } else {
          setTimeout(() => {
            resetTurn();
          }, 1000);
        }
      }
    }
  }, [choiceOne, choiceTwo]);

  const completed = cards.every((item) => item.match === true); //checked users complete the game or not
  useEffect(() => {
    handleStart();
  }, []);

  return (
    <div className="bg-[#333] h-[100vh]">
      <div className="container mx-auto pt-5">
        <h1 className="text-white text-center w-full text-3xl">Memory Game</h1>
        <div className="w-[150px] h-10 mx-auto my-3 text-white border border-white rounded-md duration-500 hover:scale-105">
          <button className="w-full h-full " onClick={handleStart}>
            {completed ? "Restart" : "Start"}
          </button>
        </div>
        <p className="text-white text-center">Turn: {turn}</p>
        {completed ? (
          <div className=" mt-32  text-4xl text-green-500 animate-bounce text-center">
            Congratulation! You finished in {turn} turns
          </div>
        ) : (
          <div className="flex">
            <div className="grid grid-cols-4 gap-5 w-[800px] mx-auto mt-5">
              {cards.map((item) => {
                return (
                  <Card
                    key={item.id}
                    item={item}
                    handleChoice={handleChoice}
                    matched={
                      item.id === choiceOne ||
                      item.id === choiceTwo ||
                      item.match
                    }
                    disable={disable}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
