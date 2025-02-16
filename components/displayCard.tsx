import { useEffect } from 'react';
import { Text } from 'react-native';

export function DisplayCard(currentCard: any) { // Specify the type of currentCard
    useEffect(() => {
        console.log(currentCard['name'], 'aaaa');
    }, []);
    return (
      <Text>
        {currentCard['name']}
      </Text>
    );
}
  
