import { useState, useEffect } from 'react';
import { app, db } from '@/scripts/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ListRenderItem } from 'react-native';
import { getGroupID } from '@/scripts/group.js';

<<<<<<< HEAD
export async function getCardsFromGroup(group_id: string) {
    const docRef = doc(db, 'allGroups', group_id);
=======
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
>>>>>>> 02bcfc881a22b22fd37ba5c467c5e2b9ffd6d79b
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()['cards'];
    } else {
        return [];
    }
  }

export async function updateCardData(card_name: string, newCardData: any) {
    console.log('updating card data in firebase so far...', newCardData);
    try {
        const docRef = doc(db, 'allGroups', 'PqS0D76ildkvGidUCPpz');
        const docSnap = await getDoc(docRef);
        const currentCards = docSnap.data()?.cards;
        console.log(currentCards, 'cardRef');
        currentCards[card_name] = newCardData;
        console.log('updating card data in firebase', newCardData);
        await setDoc(docRef, currentCards);
    } catch (error) {
        console.log('Error updating card data in Firebase:', error);
    }
}

export function CardStorage() {
    let [cardData, setCardData] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
<<<<<<< HEAD
			let storedCards = await getCardsFromGroup('PqS0D76ildkvGidUCPpz');
=======
            const id = await getGroupID();
			const storedCards = await getCardsFromGroup(id);
>>>>>>> 02bcfc881a22b22fd37ba5c467c5e2b9ffd6d79b
			setCardData(storedCards);
		};

		fetchCards();
	}, []);

    return {
        // getter
        getCardData: (key: any) => {
            return key === 'all' ? cardData : cardData[key] || null;
        },
<<<<<<< HEAD
=======
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
>>>>>>> 02bcfc881a22b22fd37ba5c467c5e2b9ffd6d79b
    }
}