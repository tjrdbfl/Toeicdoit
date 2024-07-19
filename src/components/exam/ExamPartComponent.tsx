const ExamPartComponents=({name,option}:{name:string,option:number})=>{
    return(<>
    <input
    type='radio'
    name={name}
    value={option}
    

    />
    </>);
}
export default ExamPartComponents