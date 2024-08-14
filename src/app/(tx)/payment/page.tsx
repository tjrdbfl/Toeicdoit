import MainHeader from '@/components/common/MainHeader';

import Image from "next/image";
import dynamic from 'next/dynamic';

const PaymentContainer = dynamic(() => import('@/templates/payment/PaymentContainer'), { ssr: false });

export default function PaymentPage() {

    return (
        <div
            className='px-10 lg:px-[25%]'
        >
            <MainHeader label={'토익 두잇을 구독하고 토익의 모든 것을 한 번에 학습해보세요!'} />
            <div className='mt-10' />
            <div className='flex flex-row gap-x-10 w-full'>
            <Image
              width={300}
              height={300}
              src='/images/dashboard/feature-main.png'
              alt="icon"
              className="object-contain rounded-2xl" />
            <div className='flex flex-col'>
                <h2 className='text-lg font-semibold'>토익두잇 정기구독</h2>
                <h3 className='mt-5 text-base'>토익의 모든 것을 한 번에 학습할 수 있는 All-in-one 서비스</h3>
                <div className='bg-zinc-500 h-1 w-full my-5' />
                   <div className='flex flex-row gap-x-2 text-base'>
                   <p className='text-base'>옵션 선택</p>
                   <p className='text-red-500 text-lg'>*</p>
                   </div>
                  
                   <PaymentContainer/>
                   
            </div>
            </div>
            <div className='mt-10' />
            <div className='bg-slate-200 h-0.5 w-full' />
            <div className='flex flex-row gap-x-10 justify-between px-5 lg:px-10'>
                <h1 className='mt-10 text-xl font-semibold'>제품 개요</h1>
                <div className='flex flex-col mt-10 w-[70%]'>
                    <p className='font-semibold'>[토익 두잇]</p>
                    <div className='bg-slate-200 h-1 w-full my-5' />
                    <p className='mb-5 text-sm'>토익 두잇은 토익 RC, LC의 다양한 문제 풀이를 제공합니다. 압도적인 토익 학습 데이터를 기반으로 가장 빠른 시간 내 목표 점수를 달성할 수 있도록 돕습니다.</p>
                    <div className='flex flex-row w-full gap-5'>
                        <Image
                            src={'/images/payment/level-test.png'}
                            alt={'level-test'}
                            width={250}
                            height={500}
                            className='rounded-xl shadow-md border-slate-100 border-2 w-[200px] lg:w-[250px]'
                        />
                        <Image
                            src={'/images/payment/level-test.png'}
                            alt={'level-test'}
                            width={250}
                            height={500}
                            className='rounded-xl shadow-md border-slate-100 border-2 w-[200px] lg:w-[250px]'
                        />
                    </div>
                    <p className='font-semibold mt-10'>[활용 방법]</p>
                    <div className='bg-slate-200 h-1 w-full my-5' />
                    <p className='font-semibold text-[15px]'>● 실력 향상을 위한 유료 콘텐츠, 기출 모의고사, 수준별/파트별 연습문제를 만나보세요!</p>
                    <p className='ml-5 mt-2 text-sm'>- 프리미엄 콘텐츠를 통해 다양한 난이도와 유형의 문제를 풀어보며 실력 향상을 경험하고, 맞춤형 약점 분석과 상세 해설로 학습 효과를 극대화할 수 있습니다.</p>
                    <p className='ml-5 mt-2 text-sm'>- 차트를 통해 자신의 학습 현황과 취약점을 한눈에 파악하고, 맞춤형 학습 전략을 세울 수 있습니다.</p>
                    <p className='font-semibold mt-5 text-[15px]'>● 무료 레벨 테스트</p>
                    <p className='ml-5 mt-2 text-sm'>- 무료 레벨 테스트을 통해 듣기, 어휘, 문법 등 파트별 취약점을 분석하고 가장 빠른 점수 상승을 위한 맞춤 학습을 진행해 보세요</p>
                    <p className='ml-5 mt-2 text-sm'>- 무료 레벨 테스트을 통해 자시의 현재 레벨을 진단 받고 &apos;수준별 학습&apos; 을 진행해보세요.</p>
                    <div className='flex flex-row w-full gap-5'>
                    <Image
                        src={'/images/dashboard/result.png'}
                        alt={'level-test'}
                        width={250}
                        height={500}
                        className='rounded-xl shadow-md border-slate-100 border-2 mt-5 w-[200px] lg:w-[250px]'
                    />
                    <Image
                        src={'/images/payment/my-page-result.png'}
                        alt={'level-test'}
                        width={250}
                        height={500}
                        className='rounded-xl shadow-md border-slate-100 border-2 mt-5 w-[200px] lg:w-[250px]'
                    />
                    </div>
                </div>

            </div>
            <div className='mt-10'/>
            <div className='flex flex-row gap-x-10 justify-between px-5 lg:px-10'>
                <h1 className='mt-10 text-xl font-semibold'>상세 정보</h1>
                <div className='flex flex-col mt-10 w-[70%] gap-y-2 '>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>지원언어</p>
                        <p className='text-[15px]'>한국어</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>대상</p>
                        <p className='text-[15px]'>대학생, 취업 준비생, 이직 준비</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>과목</p>
                        <p className='text-[15px]'>영어</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>구분</p>
                        <p className='text-[15px]'>문제 풀이 / 레벨테스트</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>역량</p>
                        <p className='text-[15px]'>문해력</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>학습방식</p>
                        <p className='text-[15px]'>자기 주도 학습</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>지원 환경</p>
                        <p className='text-[15px]'>웹 브라우저 기반, 앱 기반</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>지원 운영체제</p>
                        <p className='text-[15px]'>웹 브라우저 기반, 앱 기반</p>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>가격</p>
                        <div className='flex flex-col'>
                        <p className='text-[15px]'>구독</p>
                        <div className='bg-slate-100 rounded-xl p-2 w-[370px]'>
                            <p>- 구독 10일 : 100 포인트</p>
                            <p>- 구독 30일 : 200 포인트</p>
                            <p>- 구독 60일 : 500 포인트</p>
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <p className='text-blue-500 w-[120px] text-[15px]'>지역</p>
                        <p className='text-[15px]'>국내</p>
                    </div>
                    
                </div>
            </div>

            <div className='mt-10' />
            <div className='bg-slate-200 h-0.5 w-full' />

        </div>
    );
}
