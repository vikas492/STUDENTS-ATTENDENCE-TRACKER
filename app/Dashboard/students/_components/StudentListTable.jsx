import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

// Register the required module
ModuleRegistry.registerModules([AllCommunityModule]);

function StudentListTable({ studentList, refreshData }) {
    const CustomButton = (props) => {
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant="destructive"><Trash /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your record
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => DeleteRecord(props?.data?.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    const [colDefs, setColDefs] = useState([
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "address", filter: true },
        { field: "contact", filter: true },
        { field: "Action", cellRenderer: CustomButton }
    ]);
    // const reloadPage = () => {
    //   window.location.reload();
    // };
    
    const [rowData, setRowData] = useState();
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        studentList && setRowData(studentList);
    }, [studentList]);

    const DeleteRecord = async (id) => {
        try {
            const response = await GlobalApi.DeleteStudentRecord(id);
            if (response) {
                toast('Data deleted successfully');
                refreshData();
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='my-8'>
            <div
                className="ag-theme-alpine"
                style={{ height: 500 }}
            >
                <div className='p-3 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm'>
                    <Search />
                    <input type="text" placeholder='Search for student Id,Name'
                        className='outline-none w-full'
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                </div>
                <AgGridReact
                    rowData={rowData}
                    quickFilterText={searchInput}
                    columnDefs={colDefs}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default StudentListTable;
