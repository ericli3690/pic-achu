import { useState, useEffect } from 'react';
import { app, db } from '@/scripts/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ListRenderItem } from 'react-native';
import { getGroupID } from '@/scripts/group.js';

export async function getCardsFromGroup(group_id: string) {
    const docRef = doc(db, 'allGroups', group_id);
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
        const docRef = doc(db, 'allGroups', await getGroupID());
        const docSnap = await getDoc(docRef);
        const currentCards = docSnap.data()?.cards;
        console.log(currentCards, 'cardRef');
        if (currentCards) {
            currentCards[card_name] = newCardData;
            await setDoc(docRef, { cards: currentCards });
        } else {
            console.log('No current cards found to update.');
        }
        console.log('updating card data in firebase', newCardData);
    } catch (error) {
        console.error('Error updating card data:', error);
    }
}

export function CardStorage() {
    const [cardData, setCardData] = useState([]);

	useEffect(() => {
		const fetchCards = async () => {
            const id = await getGroupID();
			const storedCards = await getCardsFromGroup(id);
			setCardData(storedCards);
		};

		fetchCards();
	}, []);
}