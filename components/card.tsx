import { useState, useEffect } from 'react';
import { app, db } from '@/scripts/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ListRenderItem } from 'react-native';

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
			let storedCards = await getCardsFromGroup('PqS0D76ildkvGidUCPpz');
			setCardData(storedCards);
		};

		fetchCards();
	}, []);

    return {
        // getter
        getCardData: (key: any) => {
            return key === 'all' ? cardData : cardData[key] || null;
        },
    }
}