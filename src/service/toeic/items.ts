const items = Array.from({ length: 200 }).map((_, i) => ({
    id: i,
    name: `Item ${i}`,
}));

type Item = (typeof items)[0];

const LIMIT = 10;

export function fetchItems({ pageParam }: { pageParam: number }): Promise<{
    data: Item[];
    currentPage: number;
    nextPage: number | null;
}> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: items.slice(pageParam, pageParam + LIMIT),
                currentPage: pageParam,
                nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
            });
        }, 1000);
    });
}
export function classifyQuestion(id:number){
    return id==1 ? 'P1':
        id==7? 'P2':
        id==32? 'P3':
        id==71? 'P4':
        id==101? 'P5':
        id==131? 'P6':
        id==147? 'P7':
        '';
}