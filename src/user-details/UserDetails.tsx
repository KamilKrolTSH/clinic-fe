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

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await loadUserData();
    if (userData) {
      await loadUserDiagnose();
    }

    setLoading(false);
  };

  const loadUserData = async () => {
    const userData = await clinicClient.getUserData(userName);
    setUserData(userData.content);
  };

  const loadUserDiagnose = async () => {
    const userDiagnose = await clinicClient.getUserDiagnose(userName);
    setUserDiagnose(
      typeof userDiagnose.content === "boolean"
        ? userDiagnose.content
        : undefined
    );
  };

  const onSubmitClick = () => {
    setLoading(true);

    // send request for diagnose

    init();
  };

  const getUserDiagnose = () => {
    if (typeof userDiagnose === "boolean") {
      if (userDiagnose === true) {
        return <div>Patient is diabetic</div>;
      }
      return <div>Patient is not diabetic</div>;
    }

    return (
      <Button
        style={{ maxWidth: "200px", margin: "auto" }}
        variant="contained"
        onClick={onSubmitClick}
      >
        Diagnose
      </Button>
    );
  };

  const getUserDetails = () => {
    return userData ? (
      <div className="UserDetails">
        <Typography align="center" variant="h3">
          {userName}
        </Typography>
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
