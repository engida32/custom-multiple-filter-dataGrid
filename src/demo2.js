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
  Button,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { GridFilterPanel } from "@mui/x-data-grid";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const CFilterPanel = ({ columns, operatorValues, handleChange }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      filter: [{ column: "", operatorValue: "", searchValue: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "filter",
    control,
  });

  return (
    <Box
      sx={{
        mx: 1,
        display: "flex",
        flexDirection: "column",
        py: 3,
        minWidth: "600px",
      }}
      component={"form"}
      onSubmit={handleSubmit((data) => {
        console.log(data);
        handleChange(data?.filter);
      })}
    >
      {fields?.map((field, index) => {
        return (
          <Box
            key={field.id}
            sx={{
              my: 2,
              // mx: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton size="small" onClick={() => remove(index)}>
              <GridCloseIcon
                sx={{
                  color: "red",
                  m: 1,
                  borderRadius: "50%",
                }}
                fontSize="medium"
              />
            </IconButton>
            <FormControl
              fullWidth
              sx={{
                width: "20%",
                mx: 1,
                justifyContent: "center",
              }}
            >
              <InputLabel id="demo-simple-select-label">Column</InputLabel>
              <Select
                {...register(`filter.${index}.column`)}
                id="demo-simple-select"
              >
                {columns.map((item, index) => {
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
                // px: 2,
                mx: 1,

                width: "20%",
                justifyContent: "center",
              }}
            >
              <InputLabel>Operator</InputLabel>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...register(`filter.${index}.operatorValue`)}
                // defaultValue="contains"
              >
                {operatorValues.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              sx={{
                mx: 1,
              }}
              placeholder="Search value"
              {...register(`filter.${index}.searchValue`)}
            />
          </Box>
        );
      })}
      <Box
        sx={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Button onClick={() => append()}>Add Filters</Button>
        <Button type="submit"> Apply filter </Button>
      </Box>
    </Box>
  );
};
export default function CustomFilterPanelContent2() {
  const [filterValues, setFilter] = React.useState([]);

  console.log("from data grid", filterValues);
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        {...data}
        filterModel={{
          items: filterValues,
        }}
        components={{
          Toolbar: GridToolbar,
          // Use custom FilterPanel only for deep modification
          FilterPanel: CFilterPanel,
        }}
        componentsProps={{
          filterPanel: {
            columns: VISIBLE_FIELDS,
            operatorValues: [
              "contains",
              "equals",
              "in",
              "after",
              "before",
              "between",
            ],
            filter: filterValues,
            handleChange: setFilter,
            // Force usage of "And" operator
            linkOperators: [GridLinkOperator.And],
            // Display columns by ascending alphabetical order
          },
        }}
      />
    </div>
  );
}
