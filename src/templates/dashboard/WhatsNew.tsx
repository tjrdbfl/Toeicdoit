"use client";

import { NewFeatures } from "@/components/dashboard";
import { TitleText, TypingText } from "@/components/dashboard/CustomTexts";
import { newFeatures, styles } from "@/constants/styles/dashboard";
import { fadeIn, planetVariants } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";


const WhatsNew = () => (
  <section className={`relative z-10 mt-20 `}>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className="flex-[0.95] flex justify-center flex-col"
      >
          
            <TypingText title="| Whats new?" />
            <div className="flex flex-wrap justify-between mt-5">
            <div className="flex flex-col w-[50%]">  
            <TitleText title={<>토익 두잇에서 제공하는 맞춤형 학습으로 학습 효율을 극대화 해보세요!</>} />
            <motion.p
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="mt-[8px] font-normal text-[20px] text-left text-black "
              style={{ marginTop: '36px', lineHeight: '36px' }}
            >
              토익두잇은 사용자에 대해 학습하여 10만 건의 학습 데이터를 바탕으로 최적의 학습 경로를 제공합니다.
              또한, 사용자 간의 소통과 정보 공유를 통해 학습 동기를 부여하고 지속 가능한 학습 환경을 조성합니다.
              인공지능 기반 맞춤형 학습을 통해 개인의 학습 수준, 강점, 약점을 분석하여 맞춤형 학습 플랜을 만들어 보세요.
            </motion.p>
          </div>
          <div
            className={`w-[400px] object-cover`}
          >
            <Image loading="lazy"
              width={500}
              height={500}
              src='/images/dashboard/feature-main.png'
              alt="icon"
              className="object-contain rounded-2xl" />
          </div>
        </div>

        <div className="flex flex-wrap justify-between ">
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

    </motion.div>
  </section>
);

export default WhatsNew;
