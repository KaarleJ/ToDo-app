import { Formik, Form, Field, ErrorMessage } from "formik";

interface UserFormProps {
  className?: string;
  title: string;
  onSubmit: (
    values: Values,
  ) => void | Promise<any>;
}

interface Values {
  username: string;
  password: string;
}

const initialValues = {
  username: "",
  password: "",
};

const UserForm = ({ className, title, onSubmit }: UserFormProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-3xl text-white">{title}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: any = {};
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-stretch min-h-full h-full ">
            <Field
              name="username"
              type="text"
              placeholder="Username here..."
              className="my-5 p-2 rounded-md shadow-md shadow-purple-500"
            />
            <ErrorMessage name="username" component="div" />
            <Field
              name="password"
              type="password"
              placeholder="Password here"
              className="my-5 p-2 rounded-md shadow-md shadow-purple-500"
            />
            <ErrorMessage name="password" component="div" />
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white p-2 rounded-md shadow-md bg-purple-400"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
