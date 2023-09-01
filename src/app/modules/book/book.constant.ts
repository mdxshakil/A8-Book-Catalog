export const bookFilterableFields = [
  'minPrice',
  'maxPrice',
  'category',
  'search',
];

export const bookSearchableFields = ['title', 'author', 'genre'];

export const bookRelationalFields = ['categoryId'];
export const bookRelationalFieldsMapper = {
  categoryId: 'category',
};
