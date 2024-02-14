import { Ship } from '../types/Ship';

const API_URL = 'https://vortex.korabli.su/api/graphql/glossary/';

export const fetchShips = async (): Promise<Ship[]> => {
  const query = `{
    vehicles {
      title
      description
      icons {
        large
        medium
      }
      level
      type {
        name
        title
        icons {
          default
        }
      }
      nation {
        name
        title
        color
        icons {
          small
          medium
          large
        }
      }
    }
  }`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL Error: ${response.statusText}`);
  }

  const jsonResponse = await response.json();
  return jsonResponse.data.vehicles as Ship[];
};
