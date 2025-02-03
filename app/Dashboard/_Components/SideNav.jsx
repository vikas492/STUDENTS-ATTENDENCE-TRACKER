"use client"
import React from 'react';
import Image from 'next/image';
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';


function SideNav() {

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      Icon: LayoutIcon,
      path: '/Dashboard',
    },
    {
      id: 2,
      name: 'Students',
      Icon: GraduationCap,
      path: '/Dashboard/students',
    },
    {
      id: 3,
      name: 'Attendance',
      Icon: Hand,
      path: '/Dashboard/attendance',
    },
    {
      id: 4,
      name: 'Settings',
      Icon: Settings,
      path: '/Dashboard/settings',
    },
  ];
  const path = usePathname();
  useEffect(()=>{
    console.log(path)
  },[path])

  return (
    <div className="border shadow-md h-screen ">
    <div className="flex items-center justify-center py-5">
      <Image src={'/Logo.svg'}  width={210} height={40} alt="Logo" />
      </div>

      <hr className="my-3"></hr>
      {menuList.map((menu) => (
        <Link href={menu.path} key={menu.id}>
          <h2 className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2 ${path==menu.path && 'bg-primary text-white'}`} >
            <menu.Icon />
            {menu.name}
          </h2>
        </Link>
      ))}
    
    </div>
  );
}

export default SideNav;











// {menuList.map((menu) => (
//   <div
//     key={menu.id}
//     className="flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary hover:text-white cursor-pointer rounded-lg my-2"
//   >
//     <menu.Icon /> {/* Correctly render the icon */}
//     <span>{menu.name}</span> {/* Display the name */}
//   </div>
// ))}
