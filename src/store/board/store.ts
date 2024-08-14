import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type BoardCurrentPageStore={
    currentPage:number;
}
export const useBoardCurrentPageStore = create<BoardCurrentPageStore>()(
    persist(
      (set) => ({
        currentPage:0
      }), 
      {
        name: 'BoardCurrentPageStore',
        storage: createJSONStorage(() => sessionStorage),
    }
    )
);
