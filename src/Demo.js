import * as React from "react";
import {
  DataGrid,
  GridCloseIcon,
  GridLinkOperator,
  GridToolbar,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Modal,
  Popper,
  Button,
} from "@mui/material";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const initialState = {
  filter: {
    // filterModel: {
    //   items: [
    //     {
    //       id: 1,
    //       columnField: "name",
    //       operatorValue: "contains",
    //       value: "D",
    //     },
    //     {
    //       id: 2,
    //       columnField: "name",
    //       operatorValue: "contains",
    //       value: "D",
    //     },
    //     {
    //       id: 3,
    //       columnField: "rating",
    //       operatorValue: ">",
    //       value: "0",
    //     },
    //   ],
    // },
  },
};
const CFilterPanel = ({ fields, operatorValue, filter, handleChange }) => {
  React.useEffect(() => {
    console.log("filer", filter);
  }, [JSON.stringify(filter), fields]); 
  return (
    <Box
      sx={{
        mx: 1,
        display: "flex",
        flexDirection: "column",
        py: 5,
        minWidth: "800px",
      }}
    >
      <Box
        sx={{
          my: 1,
          display: "flex",
        }}
      >
        <FormControl>
          <IconButton size="small">
            <GridCloseIcon fontSize="small" />
          </IconButton>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            mx: 1,
            display: "flex",
            px: 2,
          }}
        >
          <InputLabel id="demo-simple-select-label">Column</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.column}
            onChange={(e) => {
              handleChange({ ...filter, column: e.target.value });
            }}
          >
            {fields.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            mx: 1,
            display: "flex",
            px: 2,
          }}
        >
          <InputLabel id="demo-simple-select-label">Operator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.operatorValue}
            onChange={(e) => {
              handleChange({ ...filter, operatorValue: e.target.value });
            }}
          >
            {operatorValue.map((item, index) => {
              return (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <TextField
          onChange={(e) => {
            handleChange({ ...filter, value: e.target.value });
          }}
        />
      </Box>
      <Box
        sx={{
          my: 1,
          display: "flex",
        }}
      >
        <FormControl>
          <IconButton size="small">
            <GridCloseIcon fontSize="small" />
          </IconButton>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            mx: 1,
            display: "flex",
            px: 2,
          }}
        >
          <InputLabel id="demo-simple-select-label">Column</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.column}
            onChange={(e) => {
              handleChange({ ...filter, column: e.target.value });
            }}
          >
            {fields.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            mx: 1,
            display: "flex",
            px: 2,
          }}
        >
          <InputLabel id="demo-simple-select-label">Operator</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter.operatorValue}
            onChange={(e) => {
              handleChange({
                ...filter,
                operatorValue: e.target.value,
              });
            }}
          >
            {operatorValue.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          onChange={(e) => {
            handleChange({ ...filter, value: e.target.value });
          }}
        />
      </Box>
      <Button onClick={() => handleChange([])}>Reset Filters</Button>
    </Box>
  );
};
export default function CustomFilterPanelContent() {
  const [filter, setFilter] = React.useState({
    column: "",
    operatorValue: "",
    value: "",
  });
  //   let filterArray = [];
  //   filter && filterArray.push(filter);
  console.log("array", filter);
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  //   gridFilterableColumnDefinitionsSelector: (apiRef) => GridStateColDef

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        components={{
          Toolbar: GridToolbar,
          // Use custom FilterPanel only for deep modification
          FilterPanel: CFilterPanel,
        }}
        componentsProps={{
          filterPanel: {
            fields: VISIBLE_FIELDS,
            operatorValue: [
              "contains",
              "equals",
              "in",
              "after",
              "before",
              "between",
            ],
            filter: filter,
            handleChange: setFilter,
            // Force usage of "And" operator
            linkOperators: [GridLinkOperator.And],
            // Display columns by ascending alphabetical order
          },
        }}
        initialState={initialState}
      />
      <code>column :{filter.column}</code>
      <br />
      operatorValue :{filter.operatorValue}
      <br />
      value :{filter.value}
    </div>
  );
}
