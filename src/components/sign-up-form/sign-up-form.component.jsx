import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../../components/form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/Button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName: displayName,
      });

      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. Please enter another email.");
      }
      console.log(error);
    }
  };

  const noAccountSignUp = (
    <>
      <h2>Dont have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={inputChangeHandler}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={inputChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={inputChangeHandler}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={inputChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </>
  );

  const signUpWithAccount = (
    <>
      <form>
        <FormInput
          label="email"
          type="email"
          required
          onChange={inputChangeHandler}
          name="email"
          value={email}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={inputChangeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />
      </form>
    </>
  );

  return <div className="sign-up-container">{noAccountSignUp}</div>;
};

export default SignUpForm;
