import { Ship } from '../types/Ship';

export const createShipCard = (ship: Ship): HTMLElement => {
  const card = document.createElement('div');
  card.className = 'ship-card';

  const imageElement = document.createElement('img');
  imageElement.src = ship.icons.large || ship.icons.medium || '';
  imageElement.alt = `Изображение ${ship.title}`;

  const titleElement = document.createElement('h2');
  titleElement.textContent = ship.title || 'Название недоступно';

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = ship.description || 'Описание отсутствует';

  const typeElement = document.createElement('p');
  typeElement.textContent = `Класс: ${ship.type.name}`;

  const nationElement = document.createElement('p');
  nationElement.textContent = `Нация: ${ship.nation.name}`;

  const levelElement = document.createElement('p');
  levelElement.textContent = `Уровень: ${ship.level}`;

  card.appendChild(imageElement);
  card.appendChild(titleElement);
  card.appendChild(descriptionElement);
  card.appendChild(typeElement);
  card.appendChild(nationElement);
  card.appendChild(levelElement);

  return card;
};
