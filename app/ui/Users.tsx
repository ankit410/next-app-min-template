'use client';

import { Box, Grid, Skeleton } from "@mantine/core";
import useUsers from "../../custom-hooks/useUsers";
import UserCard from "./User/UserCard";

const UsersSkelton = () => {
    return (<Box m="lg"><Grid>{Array.from({ length: 10 }).map((_, i) => (
        <Grid.Col key={i} span={{ base: 12, xs: 6, lg: 3 }}>
            <Skeleton height={346} width="100%" />
        </Grid.Col>
    ))}</Grid></Box>)
}

export default function Users() {
    const { loading, users, deleteUser, updateUser } = useUsers();

    if (loading) return <UsersSkelton />;

    return (<Box m="lg">
        <Grid>
            {users.map((user, i) => (
                <Grid.Col key={user.id} span={{ base: 12, xs: 6, lg: 3 }}>
                    <UserCard user={user} toggleFollow={()=>updateUser(i, { follow: !user.follow })}  deleteUser={()=>deleteUser(user.id)} />
                </Grid.Col>

            ))}
        </Grid>
    </Box>);
}
