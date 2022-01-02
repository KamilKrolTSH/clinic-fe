import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ClinicClient } from "../clients/clinic.client";

const clinicClient = new ClinicClient();

const realNumberRegex = /^[0-9]{0,7}[.]?[0-9]{0,2}$/;
const naturalRegex = /^[0-9]{0,7}$/;

const makeOnRealNumberXChange =
  (setX: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.value === "") {
      setX(e.target.value);
    } else if (realNumberRegex.test(e.target.value)) {
      setX(e.target.value);
    }
  };

const makeOnNaturalNumberXChange =
  (setX: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.target.value === "") {
      setX(e.target.value);
    } else if (naturalRegex.test(e.target.value)) {
      setX(e.target.value);
    }
  };

export function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userDataFilled, setUserDataFilled] = useState<boolean>(false);
  const [userDiagnose, setUserDiagnose] = useState<boolean | null>(null);

  const [submitDisabled, setSumbitDisabled] = useState<boolean>(true);

  const [pregnancies, setPregnancies] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] =
    useState<string>("");
  const [insulin, setInsulin] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [skinThickness, setSkinThickness] = useState<string>("");

  const onPregnancesChange = makeOnNaturalNumberXChange(setPregnancies);
  const onGlucoseChange = makeOnNaturalNumberXChange(setGlucose);
  const onBloodPressureChange = makeOnNaturalNumberXChange(setBloodPressure);
  const onDiabetesPedigreeFunctionChange = makeOnRealNumberXChange(
    setDiabetesPedigreeFunction
  );
  const onInsulinChange = makeOnNaturalNumberXChange(setInsulin);
  const onBmiChange = makeOnRealNumberXChange(setBmi);
  const onAgeChange = makeOnNaturalNumberXChange(setAge);
  const onSkinThicknessChange = makeOnNaturalNumberXChange(setSkinThickness);

  const allFields = [
    glucose,
    bloodPressure,
    diabetesPedigreeFunction,
    insulin,
    bmi,
    skinThickness,
    pregnancies,
    age,
  ];

  useEffect(() => {
    const allValid = allFields.every((value) => value.length > 0);

    setSumbitDisabled(!allValid);
  }, allFields);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await loadUserData();
    if (!userDataFilled) {
      await loadUserDiagnose();
    }

    setLoading(false);
  };

  const loadUserData = async () => {
    const userData = await clinicClient.getUserData();
    setUserDataFilled(!!userData.content);
  };

  const loadUserDiagnose = async () => {
    const userDiagnose = await clinicClient.getUserDiagnose();
    setUserDiagnose(
      typeof userDiagnose.content === "boolean" ? userDiagnose.content : null
    );
  };

  const onSubmitClick = async () => {
    setLoading(true);
    await clinicClient.setUserData({
      pregnancies: parseInt(pregnancies),
      glucose: parseFloat(glucose),
      bloodPressure: parseFloat(bloodPressure),
      diabetesPedigreeFunction: parseFloat(diabetesPedigreeFunction),
      insulin: parseFloat(insulin),
      bmi: parseFloat(bmi),
      age: parseInt(age),
      skinThickness: parseFloat(skinThickness),
    });
    await init();
  };

  const form = () => (
    <div className="Dashboard">
      <div className="Column">
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Pregnancies"
          variant="outlined"
          value={pregnancies}
          onChange={onPregnancesChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Glucose"
          variant="outlined"
          value={glucose}
          onChange={onGlucoseChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="BloodPressure"
          variant="outlined"
          value={bloodPressure}
          onChange={onBloodPressureChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Diabetes Pedigree Function"
          variant="outlined"
          value={diabetesPedigreeFunction}
          onChange={onDiabetesPedigreeFunctionChange}
        />
      </div>
      <div className="Column">
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Insulin"
          variant="outlined"
          value={insulin}
          onChange={onInsulinChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="BMI"
          variant="outlined"
          value={bmi}
          onChange={onBmiChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Age"
          variant="outlined"
          value={age}
          onChange={onAgeChange}
        />
        <TextField
          className="input"
          required
          id="outlined-basic"
          type="text"
          label="Skin Thickness"
          variant="outlined"
          value={skinThickness}
          onChange={onSkinThicknessChange}
        />
      </div>
      <Button
        variant="contained"
        onClick={onSubmitClick}
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </div>
  );

  const inc = () => <div>Loading</div>;

  const diagnose = () =>
    typeof userDiagnose === "boolean" ? (
      userDiagnose ? (
        <div>You are diabetic</div>
      ) : (
        <div>You are NOT diabetic</div>
      )
    ) : (
      <div>You are not diagnosed yet</div>
    );

  return loading ? inc() : userDataFilled ? diagnose() : form();
}
