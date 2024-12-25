import { createSlice } from "@reduxjs/toolkit";

interface SideBar {
  isOpen: boolean;
}

interface HomePage {
  sidebar: SideBar;
}
const initialState: HomePage = {
  sidebar: {
    isOpen: false,
  },
};

export const HomePageProtoSlice = createSlice({
  initialState,
  name: "HomePageProtoSlice",
  reducers: {
    toggleSideBar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
  },
});

export const { toggleSideBar } = HomePageProtoSlice.actions;
export default HomePageProtoSlice.reducer;
