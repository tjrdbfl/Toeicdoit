export type CalenderModel = {
    id: number;
    title: string;
    isAllDay: boolean;
    userId: number;
    start: Date;
    end: Date;
}

export type PaymentStatus={
    status:'OK'|'READY'|'CANCEL'
}
export type PaymentModel = {
    id: number,
    amount:number,
    status: PaymentStatus['status'],
    paymentUid:string,
    userId: number,
    productId: number,
    subscribeId: number,
    createdAt: Date,
    updatedAt: Date,
}

export type ProductModel={
    id:number,
    name:string,
    price:number,
    description:string,
    duration:number
}

export type SubscribeModle={
    id:number,
    subscribeState:boolean,
    endDate:Date,
    createdAt:Date,
    userId:number,
    paymentId:number
}

export interface IEvent {
    title?: string,
    allDay?: boolean,
    start?: Date | string,
    end?: Date | string,
    id?: number,
    userId?: number | string,
    endTime?: Date | string,
    startTime?: Date | string,
}

export interface IPayment{
    id ? : number,
    productId? : number,
    merchant_uid? : string,
    amount? : number,
    paymentUid? : string,
    imp_uid?: string,
    paymentState?: string,
    createdAt? : Date
}
export type OptionType = {
    id: number | null;
    title: string;
    message: string
}
export type I_ApiPaymentRequest={
    userId: number,
    productId:number,
    createdAt: Date,
    endDate: Date
}
export interface IamportResponse {
    success: boolean;
    error_code?: string; // 오류 코드 (결제 실패 시)
    error_msg?: string; // 오류 메시지 (결제 실패 시)
    imp_uid: string; // 아임포트에서 발급하는 고유한 결제 번호
    merchant_uid: string; // 가맹점에서 발급하는 고유한 주문 번호
    pay_method: string; // 결제 수단 (card, trans, vbank, phone 등)
    paid_amount: number; // 결제 금액
    status: string; // 결제 상태 (ready, paid, failed, cancelled 등)
    name?: string; // 상품명 또는 주문명
    pg_provider?: string; // PG사 (inicis, kcp, uplus, nice 등)
    pg_tid?: string; // PG사에서 발급하는 고유한 거래 번호
    receipt_url?: string; // 결제 영수증 URL (카드 결제 시)
    apply_num?: string; // 카드 승인 번호 (카드 결제 시)
    vbank_num?: string; // 가상 계좌 번호 (가상 계좌 결제 시)
    vbank_name?: string; // 가상 계좌 은행 (가상 계좌 결제 시)
    vbank_holder?: string; // 가상 계좌 예금주 (가상 계좌 결제 시)
    vbank_date?: number; // 가상 계좌 입금 기한 (Unix timestamp)
}
