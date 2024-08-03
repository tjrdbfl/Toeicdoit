'use client';
import { BoardData } from "@/types/BoardData";
import { NextResponse } from "next/server";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core';
import MainHeader from "@/components/common/MainHeader";
import { SetStateAction, useEffect, useState } from "react";
import { IEvent } from "@/types/TransactionData";
import MyPageCautionModal from "@/components/my-page/MyPageCautionModal";
import MyPageFormModal from "@/components/my-page/MyPageFormModal";
import { CommonHeader } from "@/config/headers";
import { SERVER_API } from "@/constants/enums/API";
import { useRouter } from "next/navigation";
import { ERROR } from "@/constants/enums/ERROR";
import LinkIcon from "@/components/common/LinkIcon";
import { MessageData } from "@/types/MessengerData";

export interface I_ApiFreeSaveResponse {
    success: boolean;
    message?: string;
    board: BoardData;
}
const CalendarContainer = ({
    userId, event
}: {
    userId: number | string |undefined,
    event: IEvent[]
}) => {

    const events=[ 
        { title: '출석', id: '1', color: '#CAF4FF' },
        { title: '토익 시험일', id: '2', color: '#fee2e2' },
        { title: '성적 발표일', id: '3', color: '#d1fae5' },
    ];
   
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [allEvents, setAllEvents] = useState<IEvent[]>(event || []);
    const [newEvents, setNewEvents] = useState<IEvent[]>([]);
    const [newEvent, setNewEvent] = useState<IEvent>({
        title: '',
        start: '',
        end: '', 
        allDay: false,
        id: 0,
        userId: userId,
    });
    const [idToDelete, setIdToDelete] = useState<number | null>(null);
    const router = useRouter();

    
    function handleDateClick(arg: { date: Date; allDay: boolean }) {
        console.log('handleDateClick')
        setNewEvent({
            ...newEvent
            , start: arg.date.toISOString()
            , end: arg.date.toISOString()
            , allDay: arg.allDay
            , id: new Date().getTime()
        });

        setShowModal(true);
    }


    function addEvent(data: DropArg) {

        const event = {
            ...newEvent,
            start: data.date.toISOString(),
            end: data.date.toISOString(), // Set end time
            title: data.draggedEl.innerText,
            allDay: true,
            id: new Date().getTime(),
        };
        setNewEvents((prevEvents) => [...prevEvents, event]);
        setAllEvents((prevEvents) => [...prevEvents, event]);
    }

    function handleDeleteModal(data: { event: { id: string } }) {
        console.log('handleDeleteModal: '+showDeleteModal);
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
    }

    function deleteEvent() {
        setAllEvents((prevEvents) => prevEvents.filter((e) => e.id !== idToDelete));
        setNewEvents((prevEvents) => prevEvents.filter((e) => e.id !== idToDelete));
        setIdToDelete(null);
    }

    const handleSave = async () => {

        const eventsToSave = newEvents.map(event => ({
            userId: userId,
            isAllDay: true,
            title: event.title,
            startTime: event.start,
            endTime: event.end,
        }));

        console.log('newEvents:', JSON.stringify(eventsToSave));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TX_API_URL}/${SERVER_API.CALENDAR}/save`, {
                method: 'POST',
                headers: CommonHeader,
                body: JSON.stringify(eventsToSave),
                cache: 'no-store'
            });


            const result: MessageData = await response.json();

            console.log('handleSave: '+JSON.stringify(result));

            if (result.state) {
                alert('일정 저장에 성공했습니다.');
                router.refresh();
            } else {
                alert('일정 저장에 실패했습니다.');
                router.refresh();

                return { status: 500 };
            }

        } catch (err) {
            console.log(err);
            alert(ERROR.SERVER_ERROR);
        }

    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const draggableEl = document.getElementById('draggable-el');
        if (draggableEl && !draggableEl.hasAttribute('data-initialized')) {
            new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData(eventEl) {
                    const title = eventEl.getAttribute('title');
                    const id = eventEl.getAttribute('data');
                    const start = eventEl.getAttribute('start');
                    const end = eventEl.getAttribute('end');
                    return { title, id, start, end };
                },
            });
            draggableEl.setAttribute('data-initialized', 'true');
        }
    }, []);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAllEvents((prevEvents) => [...prevEvents, newEvent]);
        setNewEvents((prevEvents) => [...prevEvents, newEvent]);

        setShowModal(false);
        setNewEvent({
            title: '',
            start: '',
            end: '', // Reset end field
            allDay: false,
            id: 0,
            userId: userId,
        });
    }
    return (
        <>
            <div className="flex flex-row justify-between items-center px-10 my-5">
                <div className="w-[100px]">
                    <button
                        type="button"
                        className="form_submit_btn"
                        onClick={handleSave}
                    >
                        저장하기
                    </button>
                </div>
                <div id="draggable-el" className="rounded-xl flex flex-row mb-2 justify-end">
                    {events.map((event) => (
                        <div
                            className={`fc-event border-slate-200  bg-[var(--blue4)]  hover:bg-[var(--blue5)] border-1 p-1 m-2 w-[100px] rounded-md ml-auto text-center font-medium shadow-md`}
                            title={event.title}
                            key={event.id}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-10">

                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'resourceTimelineWeek, dayGridMonth,timeGridWeek',
                    }}
                    events={allEvents as EventSourceInput}
                    nowIndicator={true}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectMirror={true}
                    dateClick={handleDateClick}
                    drop={addEvent}
                    eventClick={handleDeleteModal}
                    locale={'ko'}
                    height={500}
                    eventClassNames={(eventInfo)=>{
                        let className = '';
                        switch (eventInfo.event.title) {
                            case '토익 시험일':
                                className = 'toeic-exam';
                                break;
                            case '성적 발표일':
                                className = 'grade-announcement';
                                break;
                            case '출석':
                                className = 'attendance';
                                break;
                            default:
                                className = 'default-event';
                                break;
                        }
                        return [className];
                    }}
                />
            </div>

            {showDeleteModal && <MyPageCautionModal
                option={{
                    id: idToDelete,
                    title: "삭제",
                    message: "해당 일정을 삭제하시겠습니까?"
                }}
                setOpen={setShowDeleteModal}
                event={allEvents}
                deleteEvent={deleteEvent}
            />
            }

            {showModal && <MyPageFormModal
                handleChange={handleChange}
                newEvent={newEvent}
                setOpen={setShowModal}
                handleSubmit={handleSubmit}
            />}

        </>
    );

}
export default CalendarContainer;