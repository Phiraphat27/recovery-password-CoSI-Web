"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

import { Link, useRouter } from "@/navigation";
import { useLocale } from "next-intl";
import { deleteUser } from "@/server-action/user";
import { MessageDialog } from "@/components/dialog/addPosition";
import { deleteNews } from "@/server-action/news";
import { deletePublications } from "@/server-action/publications";

interface TableRow {
    [key: string]: any;
}

interface TableHead {
    label: string;
    key: keyof TableRow | null;
}

interface SortableTableProps {
    TABLE_ROWS: TableRow[];
    TABLE_HEAD: TableHead[];
    title: string;
    subtitle: string;
    btnAdd: boolean;
    btnAddName: string;
    btnAddLink: string;
}

const SortableTable: React.FC<SortableTableProps> = (
    {
        TABLE_ROWS,
        TABLE_HEAD,
        title,
        subtitle,
        btnAdd,
        btnAddName,
        btnAddLink,
    }
) => {
    const [rows, setRows] = useState<TableRow[]>(TABLE_ROWS);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof TableRow; direction: "ascending" | "descending" } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const localActive = useLocale();

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: keyof TableRow) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        setRows(TABLE_ROWS)
    }, [TABLE_ROWS])

    const sortedRows = useMemo(() => {
        let sortableItems = [...rows];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [rows, sortConfig]);

    const filteredRows = useMemo(() => {
        return sortedRows.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [sortedRows, searchQuery]);

    const paginatedRows = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredRows.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredRows, currentPage]);

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    const router = useRouter();

    const handleDelete = (id: string) => {
        document.getElementById(`icon-del-${id}`)?.classList.add('hidden');
        document.getElementById(`btn-del-${id}`)?.classList.remove('hidden');

        setTimeout(() => {
            document.getElementById(`icon-del-${id}`)?.classList.remove('hidden');
            document.getElementById(`btn-del-${id}`)?.classList.add('hidden');
        }, 3500);
    }

    const handleDeleteUser = async (id: string) => {
        console.log(id)
        deletePublications(id).then((res) => {
            setRows(rows.filter((row) => row.id !== id))
        })
    }

    return (
        <Card className="h-full w-full max-w-6xl mx-auto" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <CardHeader floated={false} shadow={false} className="rounded-none" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {title}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            {subtitle}
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        {/* <MessageDialog /> */}
                        {btnAdd &&
                            <Button className="flex items-center gap-3" size="sm"
                                onClick={() => {
                                    router.push(btnAddLink);
                                }}
                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <PlusIcon strokeWidth={2} className="h-4 w-4" />
                                {btnAddName}
                            </Button>
                        }
                        {/* <Button className="flex items-center gap-3" size="sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> {btnAddName}
                        </Button> */}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={searchQuery}
                            onChange={handleSearch} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-auto px-0" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map(({ label, key }) => (
                                <th
                                    key={label}
                                    className={`cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors ${key ? 'hover:bg-blue-gray-50' : ''}`}
                                    onClick={() => key && handleSort(key)}
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                    >
                                        {label}{" "}
                                        {key && (
                                            <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                        )}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedRows.map(
                            (row, index) => {
                                const isLast = index === paginatedRows.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={row.name}>
                                        {/* <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={row.img} alt={row.name} size="sm" className="object-top" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                                    >
                                                        {row.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                                    >
                                                        {row.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td> */}
                                        <td className={`${classes} max-w-sm`}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-pretty" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                                >
                                                    {row.title}
                                                </Typography>
                                                {/* <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                                >
                                                    {row.org}
                                                </Typography> */}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={row.publish ? "Publish" : "Draft"}
                                                    color={row.publish ? "green" : "gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {row.datePublish 
                                                ? new Date(row.datePublish).toLocaleString(localActive, {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        second: "numeric",
                                                    })
                                                    : "Draft"
                                                }
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                            >
                                                {new Date(row.dateEdit).toLocaleString(localActive, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    second: "numeric",
                                                })
                                                }
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <Link target="_blank" href={`/office/publications/edit/${encodeURIComponent(row.id)}`}>
                                                    <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Delete User">
                                                <IconButton
                                                    id={`icon-del-${row.id}`}
                                                    variant="text"
                                                    onClick={() => handleDelete(row.id)}
                                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Button
                                                variant="outlined"
                                                size="sm"
                                                id={`btn-del-${row.id}`}
                                                onClick={() => handleDeleteUser(row.id)}
                                                className="hidden text-red-500 border-red-500 hover:bg-red-700 hover:text-white"
                                                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Typography variant="small" color="blue-gray" className="font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

export default SortableTable;
