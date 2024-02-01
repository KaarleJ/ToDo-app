import { Formik, Form, Field, ErrorMessage } from "formik";

interface FormProps {
  className?: string;
  initialValues: Values;
  title: string;
  onSubmit: (
    values: Values,
  ) => void | Promise<any>;
}

interface Values {
  title: string;
  text: string;
  deadLine: string;
  completed: boolean,
}

const TodoForm = ({ className, initialValues, title, onSubmit }: FormProps) => {
  return (
    <div className={`${className}`}>
      <h1 className="text-3xl text-white mb-5">{title}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validate={(values) => {
          const errors: any = {};
          if (!values.title) {
            errors.title = "Required";
          }
          if (!values.text) {
            errors.text = "Required";
          }

          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col justify-center items-stretch min-h-full h-full ">
            <Field
              name="title"
              type="text"
              placeholder="Title here..."
              className="my-5 p-2 rounded-md shadow-md shadow-purple-500"
            />
            <ErrorMessage name="title" component="div" />
            <Field
              name="text"
              type="text"
              as="textarea"
              placeholder="Text here"
              className="my-5 p-2 rounded-md shadow-md shadow-purple-500"
            />
            <ErrorMessage name="text" component="div" />
            <Field
              name="deadLine"
              type="date"
              className="my-5 p-2 rounded-md shadow-md shadow-purple-500"
            />
            <ErrorMessage name="deadLine" component="div" />
            <button type="submit" disabled={isSubmitting} className="mt-3 shadow-xl text-xl text-white bg-purple-400 rounded-md self-center px-3 py-1">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TodoForm;
