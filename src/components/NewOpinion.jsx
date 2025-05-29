import { useActionState } from "react";
import Submit from "./Submit.jsx";
import { isNotEmpty, hasMinLength } from "../util/validation.js";
import { OpinionsContext } from "../store/opinions-context.jsx";
import { use } from "react";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function opinionAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!isNotEmpty(userName)) errors.push("Please enter a user name");
    if (!isNotEmpty(title))
      errors.push("Please enter a title for your opinion");
    if (!isNotEmpty(body)) errors.push("Please enter an opinion");

    if (errors.length > 0)
      return {
        errors,
        enteredData: {
          userName,
          title,
          body,
        },
      };

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(opinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredData?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredData?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredData?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
