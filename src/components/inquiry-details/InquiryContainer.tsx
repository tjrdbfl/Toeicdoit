import { InquiryColumns, InquiryContent } from "@/constants/my-page/datagrid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InquiryBody from "./InquiryBody";

const InquiryContainers = () => {

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
                    <tbody
                    key="body">
                        {InquiryContent.map((item) => (
                            <>
                                <InquiryBody
                                    id={item.id}
                                >
                                    <>
                                        <th
                                            key="id"
                                            scope="row"
                                            className="datagrid_body_content">
                                            {item.id}
                                        </th>
                                        <th
                                            key={item.title}
                                            scope="row"
                                            className="datagrid_body_content">
                                            {item.title}
                                        </th>
                                        <th
                                            key={item.date}
                                            scope="row"
                                            className="datagrid_body_content">
                                            {item.date}
                                        </th>
                                        <th
                                            key={item.state? 1: 0}
                                            scope="row"
                                            className="datagrid_body_content">
                                            {item.state ? <CheckIcon className="text-emerald-500" /> : <CloseIcon className="text-red-500" />}
                                        </th>
                                    </>

                                </InquiryBody>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default InquiryContainers;
function handleRowClick(id: number) {
    // Implement your row click logic here
}