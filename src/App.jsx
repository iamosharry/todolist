import React, { useEffect, useRef, useState } from 'react'

let count = 0
const App = () => {
  const inputRef = useRef(null)
  const [todo,setTodo] = useState([])

  const handleAdd = () =>{
    setTodo([...todo, {id: count++, text: inputRef.current.value}])
    inputRef.current.value = ''
    localStorage.setItem('itemCount', count)
  }
  const handleDelete = (id)=>{
    const updateAfter = todo.filter((item)=> item.id !== id)
    setTodo(updateAfter)
  }

  useEffect(()=>{
    setTodo(JSON.parse(localStorage.getItem("todo")))
    count = localStorage.getItem("itemCount")
  },[])

  useEffect(()=>{
    setTimeout(()=>{
      localStorage.setItem('todo',JSON.stringify(todo))
    },100)
  },[todo])
  return (
    <>
      <div className='w-full h-full flex justify-center mt-10'>
        <div className='w-1/2'>
          <input ref={inputRef} className='border border-gray-900 w-full px-3 py-3 outline-blue-500' type="text" />
          <div className='mt-3'>
            <button onClick={handleAdd} className='border border-blue-950 w-full h-full py-1 text-white bg-blue-800 rounded'>ADD TODO</button>
          </div>
          <ul className='mt-10'>
            {todo.map((item,index)=>{
              return <li key={index} className='border bg-gray-200 font-semibold mb-4 border-black w-full py-2 px-2 flex justify-between'>{item.text}
              <button onClick={()=> handleDelete(item.id)} className='bg-red-500 px-2 py-0.2'>Del</button>
              </li>
            })}
            
          </ul>
        </div>

      </div>
    </>
  )
}

export default App