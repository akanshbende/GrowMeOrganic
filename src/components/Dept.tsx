import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/system/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

function Departments() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [departmentStates, setDepartmentStates] = useState<
    Record<string, boolean>
  >({});

  const handleChange = (panel: string) => (isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // sub department chceckbox
  const handleDepartmentChange =
    (department: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      const subDepartments = departments.find(
        (item) => item.department === department
      )?.sub_departments;

      if (subDepartments) {
        const updatedStates = {
          [department]: isChecked,
          ...subDepartments.reduce((acc, subDept: string) => {
            acc[subDept] = isChecked;
            return acc;
          }, {}),
        };

        setDepartmentStates((prevState) => ({
          ...prevState,
          ...updatedStates,
        }));
      } else {
        setDepartmentStates((prevState) => ({
          ...prevState,
          [department]: isChecked,
        }));
      }
    };

  const handleSubDepartmentChange =
    (subDepartment: string, department: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      setDepartmentStates((prevState) => {
        const updatedStates = {
          ...prevState,
          [subDepartment]: isChecked,
        };

        const allSubDeptsChecked = departments
          .find((item) => item.department === department)
          ?.sub_departments.every((subDept) => updatedStates[subDept]);

        if (allSubDeptsChecked !== undefined) {
          updatedStates[department] = allSubDeptsChecked;
        }

        return updatedStates;
      });
    };

  const departments = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
    {
      department: "development",
      sub_departments: ["frontend", "backend", "fullstack"],
    },
    {
      department: "marketing",
      sub_departments: ["social_media", "content_creation", "SEO"],
    },
  ];

  return (
    <Box
      sx={{
        width: "95%",
        padding: "20px",
        display: "flex",
        gap: "10px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "#fff",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        {departments.map((item, index) => {
          const panelId = `panel${index}`;
          return (
            <Box
              key={index}
              style={{
                width: "100%",
              }}
            >
              <Accordion
                expanded={expanded === panelId}
                onChange={handleChange(panelId)}
                sx={{ boxShadow: "none" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${panelId}-content`}
                  id={`${panelId}-header`}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Checkbox
                      checked={departmentStates[item.department] || false}
                      onChange={handleDepartmentChange(item.department)}
                    />
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#16171d",
                      }}
                    >
                      {item.department}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack sx={{ marginLeft: "30px" }}>
                    {item.sub_departments.map((subDept, subIndex) => (
                      <div key={subIndex}>
                        <Checkbox
                          checked={departmentStates[subDept] || false}
                          onChange={handleSubDepartmentChange(
                            subDept,
                            item.department
                          )}
                        />
                        {subDept}
                      </div>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}

export default Departments;
