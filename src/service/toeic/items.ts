export const items = Array.from({ length: 201 }).map((_, i) => ({
    id: i+1,
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
export function classifyPart(id:number){
    return id>=1 && id<=6 ? 1:
        id>=7 && id<=31 ? 2:
        id>=32 && id<=70 ? 3:
        id>=71 && id<=100 ? 4:
        id>=101 && id<=130 ? 5:
        id>=131 && id<=146 ? 6:
        id>=147? 7: 0;
}