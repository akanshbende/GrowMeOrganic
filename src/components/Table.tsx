import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
function Table() {
  const [data, setData] = useState([]);
  // console.log("data");
  console.log("data : ", data);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts"; // Replace with your API URL
    (async () => {
      try {
        const fetchedData = await fetchData(apiUrl);
        setTimeout(() => {
          setData(fetchedData);
        }, 200);
        // console.log("Fetched data:", fetchedData);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "userId",
      width: 100,
      align: "center",
    },
    {
      field: "id",
      headerName: "Id",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      type: "string",
      width: 400,
    },
    {
      field: "body",
      headerName: "Body",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 550,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];
  return (
    <>
      <Container>
        <Box sx={{ width: "95%", padding: "20px" }}>
          <Box sx={{ height: 400, width: "100%" }}>
            <Paper>
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}

                // checkboxSelection
                // disableRowSelectionOnClick
              />
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}
export default Table;
