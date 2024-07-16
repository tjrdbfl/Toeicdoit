export const metadata = {
    title: "Toeicdoit - Register Page",
};

export default function RegisterLayout({children}:{
    children:React.ReactNode
}){
    return(
        <div className="w-full flex justify-center items-center">
        {children}
      </div>
    );
}