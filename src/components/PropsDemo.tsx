
type propType = {
    greet: string,
    by : string,
    count : number,
    userData : {
        name : string,
        empid : number,
        city : string,
        present : boolean
    },
    tasks : {
        taskname : string,
        completed : boolean
    }[],
    click:(event : React.MouseEvent<HTMLButtonElement>,id : number)=>void
}

export const PropsDemo = ({greet,by,count,userData,tasks,click}:propType) => {
  return (
   <>
    <div>{greet} for PropsDemo {by} in {count} minutes</div>
    <h3>Name : {userData.name}</h3>
    <h3>Empid : {userData.empid}</h3>
    <h3>City : {userData.city}</h3>
    <h3>Attendance : {userData.present ? "Present" : "Absent"}</h3>
    <button onClick={(event)=>click(event,7)}>Submit</button>
    <div>
        {
            tasks.map((task)=>{
                return <h2 key={task.taskname}>{task.taskname} is {task.completed ? "Completed" : "Not Completed"}</h2>
            })
        }
    </div>
   </>
  )
}
