import { useState, useEffect } from 'react';
import { app, db } from '@/scripts/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ListRenderItem } from 'react-native';
import { getGroupID } from '@/scripts/group.js';

// card type skeleton
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

export async function getCardsFromGroup(sample_text: string) {
    const id = await getGroupID();
    const docRef = doc(db, 'allGroups', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()['cards'];
    } else {
        return [];
    }
  }

export function CardStorage() {
    let [cardData, setCardData] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
            const id = await getGroupID();
			const storedCards = await getCardsFromGroup(id);
			setCardData(storedCards);
		};

		fetchCards();
	}, []);

    return {
        // getter
        getCardData: (index: number) => {
            if (index == -1) {
                return cardData;
            }
            return cardData[index];
        },
        // getter
        setCardData: (index: number, newCardData: Map<String, any>, cardData: [Map<String, any>]) => {
            cardData[index] = newCardData;
            return cardData;
        },
        // setter
        makeCardData: (newCardData: typeof cardData[number]) => {
            cardData.push(newCardData);
            return cardData;
        },
        // setter (double check this, smt smt firebase)
        updateCardData: async (index: number, newCardData: typeof cardData[number]) => {
            // setCardData(prevData => {
            //     const newData = [...prevData] as typeof cardData; // Ensure newData is typed correctly
            //     newData[index] = newCardData;
            //     return newData;
            // });
            // Update the card data in Firebase
            try {
                const id = await getGroupID();
                const cardRef = doc(db, 'allGroups', id, 'cards', index.toString());
                console.log('updating card data in firebase', newCardData);
                await setDoc(cardRef, newCardData);
            } catch (error) {
                console.log('Error updating card data in Firebase:', error);
            }
        }
    }
}