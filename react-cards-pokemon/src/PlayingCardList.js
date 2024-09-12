import React from "react";
import { v1 as uuid } from "uuid";
import PlayingCard from "./PlayingCard";
import { useAxios } from "./hooks";
import "./PlayingCardList.css";

/* Function to format playing card data */
const formatPlayingCard = (data) => ({
  id: uuid(),
  image: data.cards[0].image
});

function PlayingCardList() {
  const [cards, addCard, clearCards] = useAxios("https://deckofcardsapi.com/api/deck/new/draw/", formatPlayingCard);

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard()}>Add a playing card!</button>
        <button onClick={clearCards}>Clear all playing cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

export default PlayingCardList;


