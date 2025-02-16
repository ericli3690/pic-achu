import { useState, useEffect } from 'react';
import { app, db } from '@/scripts/firebase';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { ListRenderItem } from 'react-native';

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
			setCardData(storedCards);
		};

		fetchCards();
	}, []);

    return {
        // getter
        },
    }
}