'use server';

import { AuthorizeHeader, CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { MessageData, MessageState } from "@/types/MessengerData";
import { IEvent } from "@/types/TransactionData";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { checkTokenExist } from "../utils/token";

export async function getCalenderInfoById() {

    console.log('findUserInfoById');

    const checkResposnse = await checkTokenExist();

    console.log('checkResposnse: ' + checkResposnse?.message);

    if (checkResposnse?.message === 'LOGOUT') {
        return { message: ERROR.INVALID_MEMBER };
    } else if (checkResposnse?.status === 500 || checkResposnse?.status === 401) {
        return { message: ERROR.INVALID_MEMBER };
    } else {
        const accessToken = cookies().get('accessToken')?.value;

        const userId = cookies().get('userId')?.value;

        if (userId !== undefined && accessToken !== undefined) {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.CALENDAR}/find-all-by-userId?id=${userId}`, {
                    method: 'GET',
                    headers: AuthorizeHeader(accessToken),
                    cache: 'no-store'
                });

                const result: MessageData = await response.json();

                if (result.state) {
                    const resultEvent = result.data as IEvent[];

                    const event = resultEvent.map(event => ({
                        id: event.id,
                        userId: userId,
                        allDay: event.allDay,
                        title: event.title,
                        start: event.startTime,
                        end: event.endTime,
                    }));
                    console.log('event: ' + JSON.stringify(event));

                    return { status: 200, data: event };
                } else {
                    return { status: 500 };
                }

            } catch (err) {
                return { status: 500 };
            }
        }else{
            return {status:401, message:ERROR.INVALID_MEMBER};
        }
    }

}
