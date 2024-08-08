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
import { deleteEventById, saveEventById } from "@/service/calendar/actions";

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
        console.log('handleDateClick');
    
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
            end: data.date.toISOString(), 
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime(),
        };

        setAllEvents((prevEvents) => [...prevEvents, event]);

        handleSave(event);
    }

    function handleDeleteModal(data: { event: { id: string } }) {
        console.log('handleDeleteModal: '+showDeleteModal);
        setShowDeleteModal(true);
        setIdToDelete(Number(data.event.id));
    }

    const handleDelete=async(idToDelete:number|null)=>{
        if(idToDelete===null){
            alert('삭제할 일정을 선택해주세요.');
        }else{
            const response=await deleteEventById(idToDelete);

            if(response?.message==='SUCCESS'){
                alert('일정 삭제에 성공하셨습니다.');
            }else{
                alert('일정 삭제에 실패하셨습니다.');
            }
        }

    }

    function deleteEvent() {
        handleDelete(idToDelete);
        setAllEvents((prevEvents) => prevEvents.filter((e) => e.id !== idToDelete));
        setIdToDelete(null);
    }

    const handleSave = async (event: IEvent) => {

        const eventToSave = {
            ...event,
            startTime: event.start ? new Date(event.start) : undefined,
            endTime: event.end ? new Date(event.end) : undefined,
        };

        console.log('newEvents:', JSON.stringify(eventToSave));

        const response=await saveEventById(eventToSave);
        
        if(response.message!=='SUCCESS'){
            alert('일정 저장에 실패했습니다.');
            router.refresh();
        }else if(response.message==='SUCCESS'){
            alert('일정 저장에 성공하셨습니다.');
            router.refresh();
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

        const event = {
            ...newEvent,
            startTime: newEvent.start,
            endTime: newEvent.end,
            allDay: false,
        };   

        setAllEvents((prevEvents) => [...prevEvents, newEvent]);
        handleSave(event);

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
                    timeZone='Asia/Seoul' 
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