import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [title,setTitle] = useState("");
  const [tasks,setTasks] = useState([]);
  const [search,setSearch] = useState("");
  const [user,setUser] = useState(null);
  const [editId,setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async()=>{
    const res = await axios.get("http://localhost:5000/api/auth/profile",{
      headers:{ Authorization: token }
    });
    setUser(res.data);
  };

  const fetchTasks = async()=>{
    const res = await axios.get("http://localhost:5000/api/tasks",{
      headers:{ Authorization: token }
    });
    setTasks(res.data);
  };

  useEffect(()=>{
    fetchProfile();
    fetchTasks();
  },[]);

  const addTask = async()=>{

    if(!title){
      alert("Enter task");
      return;
    }

    if(editId){
      await axios.put(
        `http://localhost:5000/api/tasks/${editId}`,
        { title },
        { headers:{ Authorization: token } }
      );
      setEditId(null);
    }else{
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        { headers:{ Authorization: token } }
      );
    }

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async(id)=>{
    await axios.delete(`http://localhost:5000/api/tasks/${id}`,{
      headers:{ Authorization: token }
    });
    fetchTasks();
  };

  return(
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-600 text-white p-4 flex justify-between">
        <h2 className="text-xl font-bold">Task Manager</h2>
        <button
          className="bg-red-500 px-3 py-1 rounded"
          onClick={()=>{
            localStorage.clear();
            window.location="/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-6 p-4">

        {user && (
          <div className="bg-white p-4 rounded shadow mb-4">
            Welcome <b>{user.name}</b> ({user.email})
          </div>
        )}

        <div className="bg-white p-4 rounded shadow mb-4">

          <input
            className="border p-2 w-full mb-2 rounded"
            placeholder="Search task"
            value={search}
            onChange={e=>setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            <input
              className="border p-2 w-full rounded"
              placeholder="Enter task"
              value={title}
              onChange={e=>setTitle(e.target.value)}
            />

            <button
              className="bg-indigo-600 text-white px-4 rounded"
              onClick={addTask}
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>

        </div>

        <div className="bg-white p-4 rounded shadow">

          {tasks
            .filter(task =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map(task=>(
              <div
                key={task._id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{task.title}</span>

                <div className="flex gap-3">

                  <button
                    className="text-blue-500"
                    onClick={()=>{
                      setTitle(task.title);
                      setEditId(task._id);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-500"
                    onClick={()=>deleteTask(task._id)}
                  >
                    Delete
                  </button>

                </div>
              </div>
          ))}

        </div>

      </div>
    </div>
  );
}
