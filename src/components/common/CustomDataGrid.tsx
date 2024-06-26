import { InquiryColumns, InquiryContent } from "@/constants/my-page/datagrid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const CustomDataGrid = () => {

    return (
        <>
            <div className="datagrid_container">
                <table className="datagrid_table">
                    <thead className="datagrid_header">
                        <tr>
                            {InquiryColumns.map((item) => (
                                <th
                                    key={item.id}
                                    scope="col"
                                    className="datagrid_header_th">
                                    {item.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {InquiryContent.map((item) => (
                            <tr 
                            key={item.id}
                            className="datagrid_body_tr">
                                <th 
                                key={item.id}
                                scope="row" 
                                className="datagrid_body_content">
                                    {item.id}
                                </th>
                                <th 
                                key={item.id}
                                scope="row" 
                                className="datagrid_body_content">
                                    {item.title}
                                </th>
                                <th 
                                key={item.id}
                                scope="row" 
                                className="datagrid_body_content">
                                    {item.date}
                                </th>
                                <th 
                                key={item.id}
                                scope="row" 
                                className="datagrid_body_content">
                                    {item.state? <CheckIcon className="text-emerald-500"/>:<CloseIcon className="text-red-500"/>}
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomDataGrid;
function handleRowClick(id:number) {
    // Implement your row click logic here
}