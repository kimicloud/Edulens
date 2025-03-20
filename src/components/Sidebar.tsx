"use client";
import Cookies from "js-cookie";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Feedback } from "@mui/icons-material";
import { BuildCircle } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  "position": "relative",
  "borderRadius": theme.shape.borderRadius,
  "backgroundColor": alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "marginLeft": 0,
  "width": "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "color": "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const menuItems = [
  { text: "Profile", icon: "person", link: "/profile" },
  { text: "Attendance", icon: "check_circle", link: "/attendance" },
  { text: "Events", icon: "event", link: "/events" },
  { text: "Course Structure", icon: "school", link: "/courses" },
  { text: "Timetable", icon: "schedule", link: "/timetable" },
  {
    link: "/research-publications",
    text: "Research & Publication",
    icon: "library_books",
  },
  { text: "Achievements", icon: "emoji_events", link: "/achievements" },
  { text: "Placements", icon: "work", link: "/placements" },
  { text: "Resource Center", icon: "menu_book", link: "/resource-center" },
  { text: "Salary Portal", icon: "attach_money", link: "/salary" },
  { text: "Feedback | Query", icon: "feedback", link: "/feedback" },
  { text: "Trends", icon: "trending_up", link: "/trends" },
  { text: "Infrastructure", icon: "build_circle", link: "/infrastructure" },
];

const adminMenuItems = [
  { text: "Analytics", icon: "analytics", link: "/analytics" },
  ...menuItems,
];

export default function ClippedDrawer() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {/* Title */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {"EduLens"}
          </Typography>
          <Button
            onClick={() => {
              Cookies.remove("token");
              Cookies.remove("isAdmin");
              Cookies.remove("name");
              router.push("/");
            }}
            variant="contained"
          >
            SignOut
          </Button>
          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <span className="material-symbols-outlined">search</span>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Search Button Icon */}
          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            sx={{ ml: 2 }}
          >
            <span className="material-symbols-outlined">search</span>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {(Cookies.get("isAdmin") === "true"
              ? adminMenuItems
              : menuItems
            ).map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={
                  pathname === item.link
                    ? { backgroundColor: "#448ccf", color: "#ffffff" }
                    : null
                }
                className="bg-[var-(--secondary-color)]"
              >
                <ListItemButton component="a" href={item.link}>
                  <ListItemIcon>
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
