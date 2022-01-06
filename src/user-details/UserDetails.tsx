import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClinicClient } from "../clients/clinic.client";
import { UserData } from "../types/user-data";
import "./UserDetails.css";

const clinicClient = new ClinicClient();

export function UserDetails() {
  const { userName } = useParams<{ userName: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [userDiagnose, setUserDiagnose] = useState<boolean | undefined>(
    undefined
  );

  const [userDiagnosePrediction, setUserDiagnosePrediction] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const userDataRes = await clinicClient.getUserData(userName);
    setUserData(userDataRes.content);

    const userDiagnose = await clinicClient.getUserDiagnose(userName);
    console.log(userDiagnose);
    setUserDiagnose(
      typeof userDiagnose.content?.value === "boolean"
        ? userDiagnose.content.value
        : undefined
    );
    // }

    setLoading(false);
  };

  const onGetDiagnosePredictionClick = async () => {
    setLoading(true);

    const userDiagnose = await clinicClient.getUserDiagnoseSimulation(userName);
    setUserDiagnosePrediction(userDiagnose.content!.value!);

    init();
  };

  const makeOnSetClick = (diagnose: boolean) => async () => {
    setLoading(true);
    await clinicClient.setUserDiagnose({
      userName,
      diagnose,
    });
    init();
  };

  const getUserDiagnose = () => {
    if (typeof userDiagnose === "boolean") {
      if (userDiagnose === true) {
        return (
          <div style={{ textAlign: "center", color: "#f44335" }}>
            Patient is diabetic
          </div>
        );
      }
      return (
        <div style={{ textAlign: "center", color: "#90caf9" }}>
          Patient is not diabetic
        </div>
      );
    }
  };

  const getUserDiagnoseSimulation = () => {
    if (typeof userDiagnose !== "boolean") {
      if (typeof userDiagnosePrediction !== "boolean") {
        return (
          <Button
            style={{ maxWidth: "300px", margin: "auto" }}
            variant="contained"
            onClick={onGetDiagnosePredictionClick}
          >
            Diagnose prediction
          </Button>
        );
      }
      return (
        <div style={{ textAlign: "center" }}>
          <div>
            <p
              style={
                userDiagnosePrediction
                  ? { color: "#f44335" }
                  : { color: "#90caf9" }
              }
            >
              Prediction says that customer{" "}
              {userDiagnosePrediction ? "is diabetic" : "is not diabetic"}
            </p>
            <p>Final decision</p>
          </div>
          <div>
            <Button
              style={{
                maxWidth: "200px",
                margin: "auto",
                marginRight: "100px",
              }}
              variant="contained"
              onClick={makeOnSetClick(true)}
              color="error"
            >
              Diabetic
            </Button>
            <Button
              style={{ maxWidth: "200px", margin: "auto" }}
              variant="contained"
              onClick={makeOnSetClick(false)}
            >
              No Diabetic
            </Button>
          </div>
        </div>
      );
    }
  };

  const getUserDetails = () => {
    return userData ? (
      <div className="UserDetails">
        <Typography align="center" variant="h3">
          {userName}
        </Typography>
        {getUserDiagnoseSimulation()}
        {getUserDiagnose()}
        <div className="Box">
          <div className="Column">
            <Typography>Pregnancies: {userData.pregnancies}</Typography>
            <Typography>Glucose: {userData.glucose}</Typography>
            <Typography>Blood pressure: {userData.bloodPressure}</Typography>
            <Typography>
              Diabetes pedigree function: {userData.diabetesPedigreeFunction}
            </Typography>
          </div>
          <div className="Column">
            <Typography>Insulin: {userData.insulin}</Typography>
            <Typography>BMI: {userData.bmi}</Typography>
            <Typography>Age: {userData.age}</Typography>
            <Typography>Skin thickness: {userData.skinThickness}</Typography>
          </div>
        </div>
      </div>
    ) : (
      <div>Customer does not enter data yet</div>
    );
  };

  const getLoading = () => <div>Loading</div>;

  return loading ? getLoading() : getUserDetails();
}
