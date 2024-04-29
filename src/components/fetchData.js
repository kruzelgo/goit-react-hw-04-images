const API_KEY = '42569428-b104c6fed739ee1603d22c65f';
const perPage = 12;

export const fetchData = async (query, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const { hits, totalHits } = data;

    return { hits, totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    return { error: true };
  }
};
