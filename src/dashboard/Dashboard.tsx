import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
  const [submitDisabled, setSumbitDisabled] = useState<boolean>(true);

  const [pregnancies, setPregnancies] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [biabetesPedigreeFunction, setBiabetesPedigreeFunction] =
    useState<string>("");
  const [insulin, setInsulin] = useState<string>("");
  const [bmi, setBmi] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [skinThickness, setSkinThickness] = useState<string>("");

  const onPregnancesChange = makeOnNaturalNumberXChange(setPregnancies);
  const onGlucoseChange = makeOnRealNumberXChange(setGlucose);
  const onBloodPressureChange = makeOnRealNumberXChange(setBloodPressure);
  const onBiabetesPedigreeFunctionChange = makeOnRealNumberXChange(
    setBiabetesPedigreeFunction
  );
  const onInsulinChange = makeOnRealNumberXChange(setInsulin);
  const onBmiChange = makeOnRealNumberXChange(setBmi);
  const onAgeChange = makeOnNaturalNumberXChange(setAge);
  const onSkinThicknessChange = makeOnRealNumberXChange(setSkinThickness);

  const allFields = [
    glucose,
    bloodPressure,
    biabetesPedigreeFunction,
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

  const onSubmitClick = () => {};

  return (
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
          value={biabetesPedigreeFunction}
          onChange={onBiabetesPedigreeFunctionChange}
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
}
