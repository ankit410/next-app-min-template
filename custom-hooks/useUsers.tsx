'use client';

import { useEffect, useState } from "react";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    follow?: boolean;
}

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading]  = useState(false);
    const [error, setError] =  useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if(response.ok) {
               const data = await response.json();
               setUsers(data);
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        fetchUsers();
    },[]);

    const deleteUser = (id: number) =>{
        setUsers((prevUsers)=>prevUsers.filter((user)=>user.id !== id));
    }

    const updateUser = (index: number, updates: Partial<User>) =>{
        setUsers((prevUsers)=>{
            const users = [...prevUsers];
            const user= users[index];
            users[index] = {...user, ...updates};
            return users;
        });
    }

    return { loading, error, users, updateUser, deleteUser };
}

export default useUsers;