'use client';

import { ERROR } from "@/constants/enums/ERROR";
import { initialMessageState } from "@/types/MessengerData";
import { IEvent, OptionType } from "@/types/TransactionData";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";


const MyPageFormModal = ({
    handleSubmit, handleChange, newEvent, setOpen
}: {
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
    newEvent: IEvent,
    setOpen: Dispatch<SetStateAction<boolean>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    return (<>
        <dialog
            className="fixed inset-0 z-40 flex justify-center items-center"
        >
            <div className="bg-white w-[400px] h-auto shadow-lg py-3 px-5 border-slate-50 border-2">
                <form
                    action="submit" onSubmit={handleSubmit}
                >
                    <div className="mt-2">
                        <input
                            type="text"
                            name="title"
                            className="form_input"
                            value={newEvent.title}
                            onChange={handleChange}
                            placeholder="일정을 입력해주세요."
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            type="datetime-local"
                            name="start"
                            value={newEvent.start?.toLocaleString()}
                            onChange={handleChange}
                            className="form_input"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            type="datetime-local"
                            name="end"
                            value={newEvent.end?.toLocaleString()}
                            onChange={handleChange}
                            className="form_input"
                        />
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-[var(--blue2)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--blue1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-30"
                            disabled={newEvent.title === ''}
                        >
                            생성
                        </button>
                        <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={() => setOpen(false)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </dialog >
    </>);
}
export default MyPageFormModal;