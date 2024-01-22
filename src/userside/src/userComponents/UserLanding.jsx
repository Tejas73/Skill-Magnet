import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import userlandImg from "./userlanding.jpg"
import { userEmailState } from "../../../store/selectors/userEmail";
import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isLoading";

const UserLanding = () => {
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState);
    // const userLoading = useRecoilValue(isUserLoading);

    return <div>
        <Grid container style={{ padding: "5vw" }}>
            {/* text */}
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant={"h2"}>
                        Skill Magnet
                    </Typography>
                    <Typography style={{ color: "#14213D" }} variant={"h5"}>
                        A place to learn, earn and grow. Explore our courses and choose anything to your liking!
                    </Typography>
                    {userEmail && (
                        <div style={{ display: "flex", marginTop: 20 }}>
                            <div style={{ marginRight: 10 }}>
                                <Button
                                    size={"large"}
                                    variant={"contained"}
                                    style={{ backgroundColor: "#6D326D" }}
                                    onClick={() => {
                                        navigate("/courses")
                                    }}
                                >All Courses</Button>
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
            {/* image */}
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
                <img src={userlandImg} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}

export default UserLanding;