import { useState } from 'react';

export type card = {
    title: string,
    description: string,
    health: number,
    imgString: string,
    cost: string,
    move1: {
        cost: number,
        description: string,
        effect: number,
        title: string,
        type: string
    },
    move2: {
        cost: number,
        description: string,
        effect: number,
        title: string,
        type: string
    },
    owner: string,
    position: 'n/a' | 'deck' | 'hand' | 'board' | 'discord'  // Using union type for specific values
}

export function CardStorage() {
  // State to store the card data
  const [cardData, setCardData] = useState<card[]>([
    {
        title: 'title',
        description: 'description',
        health: 100,
        imgString: 'https://via.placeholder.com/150',
        cost: '10',
        move1: {
            cost: 10,
            description: 'description',
            effect: 20,
            title: 'title',
            type: 'type'
        },
        move2: {
            cost: 10,
            description: 'description',
            effect: 20,
            title: 'title',
            type: 'type'
        },
        owner: 'owner',
        position: 'n/a'
    },
  ]);

  // getter
  const getCardData = (index: number) => {
    return cardData[index];
  };

  // setter (double check this, smt smt firebase)
  const updateCardData = (index: number, newCardData: typeof cardData[number]) => {
    setCardData(prevData => {
      const newData = [...prevData];
      newData[index] = newCardData;
      return newData;
    });
  };
}