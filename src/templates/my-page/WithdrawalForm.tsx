"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { deleteByUserId, logout } from "@/service/auth/actions";
import { handleError } from "@/service/utils/error";
import { useUserInfoStore } from "@/store/auth/store";
import {
  initialFreeMessageState,
  FreeMessageState,
  initialMessageState,
} from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function WithdrawalForm({ name, email }: {
  name: string,
  email: string
}) {
  const [charCount, setCharCount] = useState(0);

  const { pending } = useFormStatus();
  const [message, setMessage] = useState<FreeMessageState>(
    initialFreeMessageState
  );

  const router = useRouter();
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
    const result = await deleteByUserId();

    console.log('handleSubmit: ' + JSON.stringify(result));

    if (result.message === 'SUCCESS') {
      alert('회원 탈퇴에 성공하셨습니다.');
      const result = await logout();

      if (result?.message.length !== 0) {
        router.push('/');
      }
    } else {
      handleError(result.message);
    }
  };

  return (
    <>
      <form action={handleSubmit} className="p-5 flex flex-col gap-y-7">
        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="type" className="form_label ">
              이름
            </label>
          </div>

          <div className="mt-3" />
          <input
            value={name}
            disabled={true}
            className="form_input"
            name="name"
            type="text"
            id="name"
          />
        </div>

        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="type" className="form_label ">
              이메일
            </label>
          </div>

          <div className="mt-3" />
          <input
            value={email}
            disabled={true}
            className="form_input"
            name="email"
            type="email"
            id="email"
          />
        </div>

        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="type" className="form_label ">
              탈퇴이유
            </label>
            <p className="text-red-500">*</p>
          </div>

          <div className="mt-3" />
          <div className="flex flex-col w-full">
            <div className="flex items-center mb-4">
              <input
                id="1"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                성과를 잘 모르겠다.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="2"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="2"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                가격 부담
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="3"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="3"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                콘텐츠 부족
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="3"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="3"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                고객 지원 불만족
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="3"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="3"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                기능 불편
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-x-5">
          <div className="flex flex-row gap-x-2 w-[100px]">
            <label htmlFor="type" className="form_label ">
              개선 의견
            </label>
          </div>

          <div className="mt-3" />
          <div className="flex flex-col w-full">
            <textarea
              name="content"
              id="content"
              required
              className="form_input"
              placeholder="토익두잇 서비스를 이용하면서 불편했던 점이나 개선되었으면 하는 부분을 자유롭게 작성해주세요. 탈퇴를 결정하게 된 이유를 구체적으로 알려주시면 서비스 개선에 큰 도움이 됩니다."
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

        <div className="bg-slate-200 h-0.5 w-full" />
        <div className="w-full flex justify-center mt-5">
          <div className="w-[400px]">
            <SubmitButton
              label={"회원 탈퇴"}
            />
          </div>
        </div>
      </form>
    </>
  );
}
