import { Ship } from './types/Ship';
import { fetchShips } from './api/fetchShips';
import { createShipCard } from './components/ShipCard';

let ships: Ship[] = [];
let filteredShips: Ship[] = [];
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    ships = await fetchShips();
    updateFilterOptions(ships);
    filteredShips = ships;
    renderShips(filteredShips);
  } catch (error) {
    console.error("Ошибка при загрузке данных о кораблях:", error);
  }

  setupFilters();
});

function updateFilterOptions(ships: Ship[]) {
  const levels = Array.from(new Set(ships.map(ship => ship.level))).sort((a, b) => a - b);
  const nations = Array.from(new Set(ships.map(ship => ship.nation.name))).sort();
  const types = Array.from(new Set(ships.map(ship => ship.type.name))).sort();

  populateFilter('filter-level', levels);
  populateFilter('filter-nation', nations);
  populateFilter('filter-type', types);
}

function populateFilter(filterId: string, options: (string | number)[]) {
  const selectElement = document.getElementById(filterId) as HTMLSelectElement;
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.toString();
    optionElement.textContent = option.toString();
    selectElement.appendChild(optionElement);
  });
}

const renderShips = (ships: Ship[]) => {
  const app = document.getElementById('app');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = ships.slice(startIndex, endIndex);

  if (!app) return;

  app.innerHTML = '';

  itemsToShow.forEach(ship => {
    const card = createShipCard(ship);
    app.appendChild(card);
  });

  renderPagination(filteredShips.length);
};

const setupFilters = () => {
  const form = document.getElementById('filters');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const level = (document.getElementById('filter-level') as HTMLSelectElement).value;
    const nation = (document.getElementById('filter-nation') as HTMLSelectElement).value;
    const type = (document.getElementById('filter-type') as HTMLSelectElement).value;

    filteredShips = ships.filter(ship =>
      (!level || ship.level.toString() === level) &&
      (!nation || ship.nation.name === nation) &&
      (!type || ship.type.name === type)
    );

    currentPage = 1;
    renderShips(filteredShips);
  });
};

const renderPagination = (totalItems: number) => {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i.toString();
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderShips(filteredShips);
    });

    if (i === currentPage) {
      pageButton.style.fontWeight = 'bold';
    }

    paginationContainer.appendChild(pageButton);
  }
};
