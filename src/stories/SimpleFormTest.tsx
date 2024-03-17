import { useState } from "react";

export function SimpleFormTest() {
  const [submittedSimple, setSubmittedSimple] = useState<string | null>(null);
  const [simple, setSimple] = useState<string | null>(null);

  const [valid, setValid] = useState<boolean>(true);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log("form: submitted", event);

        const valid = !!simple;
        setValid(valid);
        console.log("form: valid: %o", { valid, simple });
        if (valid) {
          setSubmittedSimple(simple);
        }

        const form = event.currentTarget;
        form.reset();
      }}
    >
      <div>Simple text: {submittedSimple}</div>

      <div>
        <label htmlFor="simple">Simple field</label>

        <input
          type="text"
          id="simple"
          onChange={(event) => {
            console.log("simple: onChange: %o", event.target.value);
          }}
          onBlur={(event) => {
            console.log("simple: onBlur: %o", event);
            setSimple(event.target.value);
          }}
        />
        {!valid && <div>Please fill out this field.</div>}
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
