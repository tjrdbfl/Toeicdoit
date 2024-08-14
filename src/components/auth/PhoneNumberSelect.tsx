import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const PhoneNumberSelect = ({ phone, handleChange }: {
    phone: string,
    handleChange: (event: {
        target: {
            value: string;
        };
    }) => void
}) => {
    return (<>
        <Select
            id="demo-customized-select"
            value={phone}
            onChange={handleChange}
            className="bootstrap-input"
        >
            <MenuItem value={'02'}
                className="text-black text-lg"
            >02</MenuItem>
            <MenuItem value={'010'}
                className="text-black text-lg"
            >010</MenuItem>
        </Select>
    </>);
}
export default PhoneNumberSelect;