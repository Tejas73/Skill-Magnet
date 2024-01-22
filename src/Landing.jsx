import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import landingImage from "./adminLanding.jpg";
import secondLanding from "./Knowledge-worker-scaled.jpg"
import { useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/userEmail";
import { isUserLoading } from "./store/selectors/isLoading";

const Landing = () => {
    const navigate = useNavigate()
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading);

    return <div>
        <Grid container style={{ padding: "5vw" }}>
            {/* text */}
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant={"h2"}>
                        Skill Magnet
                    </Typography>
                    <Typography style={{ color: "#14213D" }} variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>
                    {!userLoading && !userEmail && <div style={{ display: "flex", marginTop: 20 }}>
                        <div style={{ marginRight: 10 }}>
                            <Button
                                size={"large"}
                                variant={"outlined"}
                                style={{ color: "#6D326D", borderColor: "#6D326D" }}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        {/* <div>
                            <Button
                                size={"large"}
                                variant={"outlined"}
                                style={{ color: "#FCA311", borderColor: "#FCA311" }}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div> */}
                    </div>}
                </div>
            </Grid>
            {/* image */}
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
                <img src={landingImage} width={"100%"} />
            </Grid>
        </Grid>

        <Grid container style={{ padding: "5vw" }}>
            {/* image */}
            <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20, padding: 20 }}>
                <img src={secondLanding} width={"100%"} />
            </Grid>
            {/* text */}
            <Grid item xs={12} md={6} lg={6}>
                <div style={{ marginTop: 100 }}>
                    <Typography variant={"h3"}>
                        Teach the World, Share Your Expertise!
                    </Typography>
                    <Typography style={{ color: "#14213D" }} variant={"h5"}>
                        Empower others while earning from your passion. At Skill Magnet, we invite you to become an instructor and shape the future of learning. Unleash your expertise, and let the world benefit from your knowledge.
                    </Typography>
                    { }
                </div>
            </Grid>
        </Grid>
    </div>
}

export default Landing;
