import { useExamTakeStore } from "@/store/toeic/exam";

export function splitStringToList(str: string): string[] {
    if (!str || !str.includes('||')) {
      return [str];
    }
  
    const list = str.split('||').map(item => item.trim());
    return list;
}
export function getTakeById(id:number):boolean|undefined{
  const {exams}=useExamTakeStore.getState();
  return exams.find(exam=>exam.id===id)?.take;
}
export function getExamTitleId(id:number):number{
  return 14-((id+5)%14);  
}
export function getExamTitleYear(id:number):number{
  return 2024-Math.floor(((id+5)/14));
}

export function countUniqueElements(arr1: string[], arr2: string[]): number {
  const combinedSet = new Set([...arr1, ...arr2]);
  return combinedSet.size; 
}
export function countUniqueMember(arr1:string[],arr2:string[]):number[]{
  const combinedSet=new Set([...arr1,...arr2]);
  const combinedArray=Array.from(combinedSet);
  const convertedToInts=combinedArray.map(str=>{
    const parsedInt=parseInt(str,10);
    return isNaN(parsedInt)?0:parsedInt;
  })

  return convertedToInts;
}
