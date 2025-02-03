"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner"


function AddNewStudent({refreshData}) {
  const [open, setOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

useEffect(()=>{
  GetAllStudentList();
},[])

  const GetAllStudentList = ()=>{
    GlobalApi.GetAllGrades().then(resp=>{
      setGrades(resp.data);
    })
  }

  const [grades,setGrades]=useState([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const { register, handleSubmit,reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("FormData", data);
    GlobalApi.CreateNewStudent(data).then(resp=>{
      console.log("--",resp);
      if(resp.data){
        reset();
        refreshData()
        setOpen(false); 
        toast('A new student is added')
      }
    })
  };

  if (!isHydrated) {
    return null; // Avoid rendering during SSR
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="EX - Vikas Santosh Zende"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <span className="text-red-500">Name is required</span>}
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((items,index)=>(
                           <option key={index} value={items.grade}>{items.grade}</option>
                    ))}
                    
                   
                  </select>
                  {errors.grade && <span className="text-red-500">Grade is required</span>}
                </div>
                <div className="py-2">
                  <label>Contact</label>
                  <Input type="Number" placeholder="EX-9920369584" {...register("contact")} />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    placeholder="EX - Antella Building"
                    {...register("address", { required: true })}
                  />
                  
                  {errors.address && <span className="text-red-500">Address is required</span>}
                </div>
                <div className="flex gap-3 items-center justify-end my-5">
                  <Button type="button" onClick={() => setOpen(false)} variant="ghost">
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
