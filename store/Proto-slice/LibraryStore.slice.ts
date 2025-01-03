import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

interface LibraryListItem {
  thumbnailUrl: string;
  name: string;
  numberOfWords: number;
  numberOfFlashcards: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  publicDate: string;
}

interface LibraryListProps {
  libraryList: LibraryListItem[];
}

const initialState: LibraryListProps = {
  libraryList: Array.from({ length: 10 }, (_, i) => {
    return {
      thumbnailUrl: faker.image.urlPicsumPhotos(),
      name: faker.book.title(),
      numberOfWords: faker.number.int({ min: 100, max: 1000 }),
      numberOfFlashcards: faker.number.int({ min: 50, max: 500 }),
      author: {
        name: faker.book.author(),
        avatarUrl: faker.image.avatar(),
      },
      publicDate: faker.date.anytime().toString(),
    };
  }),
};

export const LibrarySlice = createSlice({
  initialState,
  name: "library",
  reducers: {},
});

export const {} = LibrarySlice.actions;

export default LibrarySlice.reducer;
