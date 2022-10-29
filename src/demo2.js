import * as React from "react";
import {
  DataGrid,
  GridCloseIcon,
  GridLinkOperator,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
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
import { Add, Clear, FileDownload, Search } from "@mui/icons-material";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const CFilterPanel = ({ columns, operatorValues, handleChange }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      filter: [
        {
          colOperator: null,
          column: "",
          operatorValue: "",
          searchValue: "",
        },
      ],
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
        alignItems: "center",
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
              width: "100%",
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
            {index > 0 && (
              <FormControl
                fullWidth
                sx={{
                  mx: 1,

                  width: "20%",
                  justifyContent: "center",
                }}
              >
                <Select
                  defaultValue={"OR"}
                  variant="outlined"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register(`filter.${index}.colOperator`)}
                  sx={{
                    border: 1,
                    px: 0,
                  }}
                >
                  <MenuItem value={"or"}>OR</MenuItem>
                  <MenuItem value={"or"}>AND</MenuItem>
                </Select>
              </FormControl>
            )}
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

function QuickSearchToolbar(props, { setFilterButtonEl }) {
  // React.useEffect(() => {
  //   if (data) {
  //     console.log({ data });
  //   }
  // }, [data]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#000000",
        mx: 1,
        py: 4,
        borderBottom: 3,
        borderColor: "#E8E8E8",
      }}
    >
      <Box>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search"
          // size="small"
          sx={{
            backgroundColor: "#EFEFEF",
            width: "700px",
          }}
          InputProps={{
            startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}
              >
                <Clear fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <GridToolbarContainer>
          <GridToolbarColumnsButton sx={{ mx: 1, width: "100px" }} />
          <GridToolbarContainer sx={{ mx: 2, p: 0 }}>
            <GridToolbarFilterButton />
          </GridToolbarContainer>{" "}
          <GridToolbarDensitySelector sx={{ mr: 1 }} />
          {/* <GridToolbarExport sx={{ mr: 1 }} /> */}
          <Button size="small" startIcon={<FileDownload />} sx={{ mr: 1 }}>
            {/* <CSVLink
              data={data?.data?.data || []}
              asyncOnClick={true}y
              style={{ textDecoration: "inherit", color: "inherit" }}
              filename={"Merchant Portal.csv"}
              onClick={(event, done) => {
                console.log({ event, done });
                refetch();
                if (data) {
                  done();
                } else {
                  done(false);
                  alert("Please Click again!");
                }
              }}
            >
              EXPORT
            </CSVLink> */}
            Export
          </Button>
        </GridToolbarContainer>

        {/* <GridToolbar /> */}
        <Button
          sx={{
            mx: 2,
            bgcolor: "#FFDC00",
            color: "white",
            boxShadow: 2,
            p: 1.3,
            " :hover": {
              bgcolor: "#FFDC00",
              color: "white",
            },
          }}
          onClick={props.add}
          // startIcon={<Add />}
        >
          Add corporate
        </Button>
      </Box>
    </Box>
  );
}
export default function DashboardWithCustomFilterPanel() {
  const [filterValues, setFilter] = React.useState([]);

  console.log("from data grid", filterValues);
  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });
  console.log("first", GridLinkOperator);
  let filterModel = {
    items: filterValues,
    quickFilterLogicOperator: GridLinkOperator.Or,
  };
  console.log(filterModel);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ mx: 4, mt: 3, color: "#000" }}
        {...data}
        filterModel={{
          items: filterValues,
          quickFilterLogicOperator: GridLinkOperator.Or,
        }}
        components={{
          Toolbar: QuickSearchToolbar,
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
          },
          panel: {
            // anchorEl: filterButtonEl,
            placement: "bottom-end",
          },
        }}
      />
    </div>
  );
}
