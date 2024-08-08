export function splitStringToList(str: string): string[] {
    if (!str || !str.includes('||')) {
      return [];
    }
  
    const list = str.split('||').map(item => item.trim());
    return list;
}
