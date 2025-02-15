import { useState } from 'react';

export function Card() {
  // State to store the card data
  const [cardData, setCardData] = useState([
    {
        title: 'title',
        description: 'description',
        health: 100,
        imgString: 'https://via.placeholder.com/150',
        move1: {
            cost: 10,
            description: 'Move 1 Description',
            effect: 20,
            title: 'Move 1 Title',
            type: 'Move 1 type',
        },
        move2: {
            cost: 10,
            description: 'Move 2 Description',
            effect: 20,
            title: 'Move 2 Title',
            type: 'Move 2 type',
        },
        owner: 'owner',
        position: 'n/a', // n/a, deck, hand, board, discard
    },
  ]);

  // getter
  const getCardData = (index: number) => {
    return cardData[index];
  };

  // setter (double check this)
  const updateCardData = (index: number, newCardData: typeof cardData[number]) => {
    setCardData(prevData => {
      const newData = [...prevData];
      newData[index] = newCardData;
      return newData;
    });
  };
}