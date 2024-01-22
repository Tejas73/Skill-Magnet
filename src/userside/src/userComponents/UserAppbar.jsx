import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../../store/atoms/user";
import { userEmailState } from "../../../store/selectors/userEmail";
import { isUserLoading } from "../../../store/selectors/isLoading";


function UserAppBar() {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    const appbarStyle = {
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
        position: "sticky",  // Make the app bar sticky
        top: 0,              // Stick it to the top of the viewport
        backgroundColor: "#e5e5e5"
    };
    // for some reason, the userLoading doesn't let appbar to render
    // if (userLoading) { 
    //         return <></>
    //     }
    if (userEmail) {
        return (
            <div style={appbarStyle}>
                <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
                    <Typography variant="h6">Skill Magnet</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10, display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                            <Button style={{ color: "#FCA311" }} onClick={() => navigate("/userpurchasedcourses")}>My course</Button>
                        </div>

                        <Button style={{ backgroundColor: "#6D326D" }}
                            variant={"contained"}
                            onClick={() => {
                                localStorage.setItem("token", null);
                                setUser({
                                    isLoading: false,
                                    userEmail: null,
                                });
                                navigate("/");
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={appbarStyle}>
                <div style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => navigate("/")}>
                    <Typography variant={"h6"}>Skill Magnet</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button variant={"contained"} style={{ backgroundColor: "#6D326D" }} onClick={() => navigate("/usersignup")}>
                            Register
                        </Button>
                    </div>
                    <div>
                        <Button variant={"contained"} style={{ backgroundColor: "#FCA311" }} onClick={() => navigate("/userlogin")}>
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAppBar;
