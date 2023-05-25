import React, { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/Button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password. Please try again.");
          break;
        case "auth/user-not-found":
          alert(
            "No user found with this email. Please sign up with this email id."
          );
          break;
        default:
          console.log(error);
      }
    }
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const signUpWithAccount = (
    <>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password or with Google.</span>
      <form onSubmit={formSubmitHandler}>
        <FormInput
          label="email"
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <br />
          <p>Or</p>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </>
  );

  return <div className="sign-up-container">{signUpWithAccount}</div>;
};

export default SignInForm;
