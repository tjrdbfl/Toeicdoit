"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { saveBoard } from "@/service/board/actions";
import { handleError } from "@/service/utils/error";
import {
  initialFreeMessageState,
  FreeMessageState,
} from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function RequestForm() {
  const [charCount, setCharCount] = useState(0);

  const { pending } = useFormStatus();
  const [message, setMessage] = useState<FreeMessageState>(
    initialFreeMessageState
  );
  const router = useRouter();
  
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 8) {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          title: ["최소 8자리 이상 입력해주세요."]
        },
      }));
    } else {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          title: [""]
        },
      }));
    }
  }

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
    if (event.target.value.length < 50) {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          content: ["최소 50자리 이상 입력해주세요."],
        },
      }));
    } else {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          content: [""],
        },
      }));
    }
  };

  const handleSubmit = async (formData: FormData) => {

    const result: FreeMessageState = await saveBoard(initialFreeMessageState, formData);

    if (result.message) {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          title: result.message.title || [],
          content: result.message.content || [],
        },
        result_message: result.result_message,
      }));
    }

    console.log('login handleSubmit: ' + result.result_message);

    if (result.result_message === 'SUCCESS') {
      router.push(`${PG.INQUIRY_DETAILS}`);
    } else {
      handleError(result.result_message);
    }

  };

  return (
    <>
      <form action={handleSubmit} 
      className="p-5 flex flex-col gap-y-7">
        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="type" className="form_label ">
              문의유형
            </label>
            <p className="text-red-500">*</p>
          </div>
          <input
        className="hidden"
        value={'request'}
        name='type'
        />
          <div className="mt-3" />
          <select
            name="category"
            id="category"
            required
            className="form_input block w-full"
            disabled={pending}
          >
            <option value="결제 문의">결제 문의</option>
            <option value="시스템 에러">시스템 에러</option>
            <option value="학습 콘텐츠">학습 콘텐츠</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div className="flex flex-row gap-x-5 ">
        <div className="flex flex-row gap-x-2 w-[100px]">
          <label htmlFor="title" className="form_label">
            제목
          </label>
          <p className="text-red-500">*</p>
        </div>

        <div className="mt-3" />
        <div className="flex flex-col w-full">
          <input
            type="text"
            name="title"
            id="title"
            required
            className="form_input"
            placeholder="필수 항목입니다."
            disabled={pending}
            onChange={handleTitleChange}
          />
          {message.message.title && (
            <p aria-live="polite" className="text-red-500 mt-2 text-[13px]">
              {message.message.title}
            </p>
          )}
        </div>
      </div>

        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="content" className="form_label">
              문의내용
            </label>
            <p className="text-red-500">*</p>
          </div>

          <div className="mt-3" />
          <div className="flex flex-col w-full">
            <textarea
              name="content"
              id="content"
              required
              className="form_input"
              placeholder="※ 상담사에게 폭언, 욕설 등을 하지 말아주세요. 다변을 받지 못하거나 사전 아내 없이 삭제할 수 있습니다."
              style={{ height: 250 }}
              maxLength={1000}
              onChange={handleContentChange}
              disabled={pending}
            />
            <p className="text-slate-500 mt-2 text-end text-[14px] font-medium">
              {charCount}자/1000자
            </p>
          </div>
        </div>

        <p aria-live="polite" className="sr-only text-red-500 mt-1">
          {message.message.category}
        </p>

        <label className="form_label" htmlFor="file_input">
          파일 첨부하기
        </label>
        <input
          className="block p-3 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          name="file"
        />
        <p className="mt-1 text-[13px] text-gray-400" id="file_input_help">
          pg, gif, psd, png, tif, zip, pdf ,ms office, hwp 만 첨부 가능하고
          <br />
          20MB까지 등록가능하며 첨부파일은 답변완료가 되면 즉시 삭제됩니다.
        </p>

        <div className="bg-zinc-300 w-full h-[0.5px] my-3" />
        <div className="w-full flex justify-center mt-5">
          <div className="w-[400px]">
            <SubmitButton label={"문의접수"} />
          </div>
        </div>
      </form>
    </>
  );
}
