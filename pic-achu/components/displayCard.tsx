import { CardStorage, type card } from './card';

export function DisplayCard(currentCard: card) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h1>{currentCard.title}</h1>
            <p>{currentCard.description}</p>
            <p>{currentCard.health}</p>
            <p>{currentCard.imgString}</p>
            <p>{currentCard.cost}</p>
            <p>{currentCard.move1.cost}</p>
            <p>{currentCard.move1.description}</p>
            <p>{currentCard.move1.effect}</p>
        </div>
    );
}
