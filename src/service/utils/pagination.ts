import { ITEMS_PER_PAGE } from "@/types/ToeicData"

export function getPageGroup(currentPage: number) {
  const pageGroup = Math.floor((currentPage - 1) / ITEMS_PER_PAGE);
  return pageGroup;
}
export const generatePagination = (currentPage: number, totalPages: number) => {
  const pageGroup = getPageGroup(currentPage);

  if (pageGroup < 0 || pageGroup >= totalPages) {
    return [];
  }

  const startIndex=pageGroup*10;
  const endIndex=Math.min(startIndex+9,totalPages-1);

  if (totalPages <= ITEMS_PER_PAGE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  return Array.from({length:endIndex-startIndex+1},(_,i)=>startIndex+i+1);
}

export function getLeftDoublePage(currentPage: number) {
  const pageGroup = Math.floor((currentPage - 1) / ITEMS_PER_PAGE);
  const realPageGroup = pageGroup === 0 ? 1 : pageGroup;
  return realPageGroup === 1 ? 1 : realPageGroup * ITEMS_PER_PAGE - 1;
}
export function getRightDoublePage(currentPage: number,totalPages:number) {
  return getPageGroup(currentPage)===getPageGroup(totalPages)? totalPages:(Math.floor((currentPage - 1) / ITEMS_PER_PAGE) + 1) * ITEMS_PER_PAGE + 1;
}