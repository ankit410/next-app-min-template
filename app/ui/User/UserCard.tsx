'use client';

import { Paper, Avatar, Text, Group, Button, Tooltip } from '@mantine/core';
import { User } from '../../../custom-hooks/useUsers';
import classes from "./UserCard.module.css";
import { formatUrlText } from '../../../utils/word-utils';
import At from '../../../icons/At';
import Phone from '../../../icons/Phone';
import Website from '../../../icons/Website';
import UserPlus from '../../../icons/UserPlus';
import Delete from '../../../icons/Delete';
import UserMinus from '../../../icons/UserMinus';
import Star from '../../../icons/Star';

interface Props {
    user: User,
    deleteUser: () => void;
    toggleFollow: () => void;
}

const UserCard = (props: Props) => {
    const { deleteUser, toggleFollow } = props;
    const { name, email, phone, website, follow } = props.user;
    const imgSrc = `https://api.dicebear.com/7.x/initials/svg?seed=${formatUrlText(name)}`;
    const rows = [
        { icon: At, label: email, href: `mailto:${email}` },
        { icon: Phone, label: phone, href: `tel:${phone}` },
        { icon: Website, label: website, href: website },
    ];

    const buttonData = follow ? { label: "Unfollow", icon: UserMinus, variant: "default" } : { label: "Follow", icon: UserPlus, variant: "filled" }

    return <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)" shadow='md'>
        <Tooltip
            label={name}
            position="top"
            withArrow
        >
            <a className={classes.anchorEl} href={website} target='_blank'>
                <Avatar
                    src={imgSrc}
                    size={120}
                    radius={120}
                    mx="auto"
                />
            </a>
        </Tooltip>
        <Text className={classes.userFullName}>
            {name}
            {follow && <Star style={{ marginLeft: "5px" }} />}
        </Text>
        {rows.map((row) => {
            const Icon = row.icon;
            return (
                <Group key={row.label} className={classes.groupGap} >
                    <Icon height={16} width={16} color='var(--mantine-color-dimmed)' />
                    <a className={classes.anchorEl} href={row.href} target='_blank'>
                        <Text c="dimmed" fz="md">
                            {row.label}
                        </Text>
                    </a>
                </Group>
            )
        })}
        <Group className={classes.buttonGroup}>
            <Button leftSection={<buttonData.icon />} variant={buttonData.variant} fullWidth onClick={toggleFollow}>{buttonData.label}</Button>
            <Button leftSection={<Delete />} variant="outline" fullWidth onClick={deleteUser}>Delete</Button>
        </Group>
    </Paper>
}

export default UserCard;