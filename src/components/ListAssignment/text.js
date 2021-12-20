import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

function Table({ columns, data, updateMyData, sortBy }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      initialState: { sortBy },
    },
    useSortBy
  );

  //Profile dialog
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const handleClickProfile = (event) => setAnchorElProfile(event.currentTarget);
  const handleCloseProfile = () => setAnchorElProfile(null);

  const [dataCell, setDataCell] = useState([]);

  const [colID, setColID] = useState();
  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                //sort column.getSortByToggleProps()
                <th
                  {...column.getHeaderProps()}
                  onClick={() => {
                    console.log("col", column.id);
                    setColID(column.id);}}

                  //   //set sort desc, aesc or none?
                  //   const desc =
                  //     column.isSortedDesc === true
                  //       ? undefined
                  //       : column.isSortedDesc === false
                  //       ? true
                  //       : false;
                  //   setSortBy([{ id: column.id, desc }, ...sortBy]);
                  // }}
                >
                  {column.render("Header")}

                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>

                  <IconButton onClick={handleClickProfile}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElProfile}
                    open={Boolean(anchorElProfile)}
                    onClose={handleCloseProfile}
                    onClick={handleCloseProfile}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                  >
                    <MenuItem
                      onClick={() => {
                        console.log("colID", colID);
                        let items = new Set();

                        for (const row of rows) {
                          let obj = row.allCells.find(
                            (o) => o.column.id === colID
                          );
                          items.add({
                            name: row.allCells[1].value,
                            grade: obj.value,
                          });
                        }
                        setDataCell(items);
                        console.log(dataCell);
                      }}
                    >
                      Save
                    </MenuItem>
                    <MenuItem>Reset</MenuItem>
                  </Menu>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <>
                      {/* Here added onClick function to get cell value */}
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function ListAssignment() {
  const infoData = [
    {
      mssv: "1234",
      name: "Raj4",
      listAssignment: [
        {id:"1", assignment: "bt1", grade1: "1" },
        {id:"2", assignment: "bt2", grade2: "1" }
      ],
    },
    {
      mssv: "1235",
      name: "Raj5",
      listAssignment: [
        {id:"1", assignment: "bt1", grade1: "2" },
        {id:"2", assignment: "bt2", grade2: "2" }
      ],
    },
    {
      mssv: "1236",
      name: "Raj6",
      listAssignment: [
        {id:"1", assignment: "bt1", grade1: "6" },
        {id:"2", assignment: "bt2", grade2: "6" }
      ],
    },
    {
      mssv: "1237",
      name: "Raj7",
      listAssignment: [
        {id:"1", assignment: "bt1", grade1: "7" },
        {id:"2", assignment: "bt2", grade2: "7" }
      ],
    }
  ];
  
  let firstColumn =  [
      {Header: "Student ID",accessor: "mssv"},
      {Header: "Name",accessor: "name"}
    ];

  let otherColumns = [];
  infoData[0].listAssignment.forEach((ass,idx) => {
    let otherColumn = {
      Header: ass.assignment,
      accessor: 'grade' + (idx+1)
    };

    otherColumns = [...otherColumns, otherColumn];
  });

      // Define column of the table
      const columns= React.useMemo(() => [ ...firstColumn , ...otherColumns], [infoData]);

  const [data, setData] = useState(infoData);
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data changes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  const sortBy = [{ id: "mssv" }];

  return (
    <Styles>
      <button
        onClick={() => {
          console.log("data", data);
        }}
      >
        Export as CSV
      </button>

      <button>Import as CSV</button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        sortBy={sortBy}
      />
    </Styles>
  );
}

export default ListAssignment;
