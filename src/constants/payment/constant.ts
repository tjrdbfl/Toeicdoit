export type productsType={
    id:number,
    name:string,
    price:number,
    duration:number,
}
export const products = {
    option1: { id: 1, name: '상품 1', price: 100, duration: 10 },
    option2: { id: 2, name: '상품 2', price: 200, duration: 30 },
    option3: { id: 3, name: '상품 3', price: 500, duration: 60 }
};

export const options = [
    { value: 'option1', label: '1. 구독 10일 (100 포인트)' },
    { value: 'option2', label: '2. 구독 30일 (200 포인트)' },
    { value: 'option3', label: '3. 구독 60일 (500 포인트)' },
  ];