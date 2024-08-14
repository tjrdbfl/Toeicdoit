"use client";
import SubmitButton from "@/components/button/SubmitBtn";
import { ERROR } from "@/constants/enums/ERROR";
import { PG } from "@/constants/enums/PG";
import { modifyBoard, deleteBoard } from "@/service/board/actions";
import { handleError } from "@/service/utils/error";
import { BoardData } from "@/types/BoardData";
import {
  initialFreeMessageState,
  FreeMessageState,
} from "@/types/MessengerData";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function FreeModifyForm({ post }: { post: BoardData }) {
  
  const [charCount, setCharCount] = useState(post.content.length);
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
          title: ["최소 8자리 이상 입력해주세요."],
        },
      }));
    } else {
      setMessage((prevState) => ({
        ...prevState,
        message: {
          ...prevState.message,
          title: [""],
        },
      }));
    }
  };

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

  const handleDelete = async () => {
    const deleteResult = await deleteBoard(post.id);
    
    if(deleteResult.message==='SUCCESS'){
      alert('삭제에 성공하셨습니다.');
      router.push(`${PG.INQUIRY_DETAILS}`);
    }else{
      handleError(deleteResult.message);
    }
  
  };

  const handleSubmit = async (formData: FormData) => {

    const result: FreeMessageState = await modifyBoard(initialFreeMessageState, formData);

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
      alert('수정을 성공하셨습니다.');
      router.push(`${PG.INQUIRY_DETAILS}`);
    } else {
      handleError(result.result_message);
    }

  };

  return (
    <>
      <form action={handleSubmit} className="p-5 flex flex-col gap-y-5">
        <div className="flex flex-row justify-end gap-x-2">
          <div className="w-[80px]">
            <button className="form_submit_btn" type='button' onClick={handleDelete}>
              삭제
            </button>
          </div>
          <div className="w-[80px]">
            <SubmitButton label={"수정"} />
          </div>
        </div>

        <input
          className="hidden"
          value={post.type}
          name='type'
        />

        <div className="px-10 flex flex-col gap-y-5">
          <div className="flex flex-row gap-x-5 mt-5">
            <div className="flex flex-row gap-x-2 w-[100px]">
              <label htmlFor="category" className="form_label">
                카테고리
              </label>
              <p className="text-red-500">*</p>
            </div>

            <div className="mt-3" />
            <select
              name="category"
              id="category"
              required
              className="form_input block w-full"
            >
              {post.type === "free" ? (
                <option selected={post.category==='공부법'} value="공부법">
                  공부법
                </option>
              ) : (
                <option selected={post.category==='결제 문의'} value="결제문의">결제문의</option>
              )}
              {post.type === "free" ? (
                <option selected={post.category==='자료 공유'} value="자료 공유">
                 자료 공유
                </option>
              ) : (
                <option selected={post.category==='시스템 에러'} value="시스템 에러">시스템 에러</option>
              )}
              {post.type === "free" ? (
                <option selected={post.category==='시험 후기'} value="시험 후기">
                  시험 후기
                </option>
              ) : (
                <option selected={post.category==='학습 콘텐츠'} value="학습 콘텐츠">학습 콘텐츠</option>
              )}
              {post.type === "request" && (
                <option selected={post.category==='기타'} value="기타">기타</option>
              )}
            </select>
          </div>

          <div className="flex flex-row gap-x-5 mt-5">
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
                onChange={handleTitleChange}
                required
                className="form_input"
                placeholder={post.title}
                defaultValue={post.title}
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
          내용
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
            placeholder={post.content}
            defaultValue={post.content}
            style={{ height: 300 }}
            maxLength={1000}
            onChange={handleContentChange}
          />
            <div className="flex flex-row justify-between mt-1">
            {message.message.content && ( 
              <p aria-live="polite" className="text-red-500 mt-1 text-[13px]">
                {message.message.content}
              </p>
            )}
            {message.message.content && ( 
              <p aria-live="polite" className="text-red-500 mt-1 text-[13px]">
                {message.message.content}
              </p>
            )}
            <p className="text-slate-500 text-end font-medium text-[14px]">
              {charCount}자/1000자
            </p>
          </div>
          </div>
        </div>
        </div>

        <input id="boardId" name="boardId" hidden value={post.id} />
      </form>
      <div className="bg-slate-100 w-full h-0.5 mt-5"/>
    </>
  );
}
