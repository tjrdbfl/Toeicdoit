import RecommendGuide from "@/templates/study/RecommendGuide";
import RecommendStep1 from "@/templates/study/RecommendStep1";
import RecommendStep2 from "@/templates/study/RecommendStep2";

const metadata = {
  title: "Toeicdoit - Study Recommend Page",
};
export default function StudyRecommendPage() {
  return (
    <>
        <div className="lg:px-[20%]">
        <RecommendGuide/>
       <div className="mt-28"/>
       <RecommendStep1/>
       <div className="mt-28"/>
       <RecommendStep2/>
       <div className="mt-28"/>
        </div>

    </>
  );
}
