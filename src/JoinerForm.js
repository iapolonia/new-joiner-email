import React from "react";

import { useForm, Controller } from "react-hook-form";

import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control";
import { DatePicker } from "baseui/datepicker";

export default function ({ onSubmit, onPreview }) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    reset,
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="Name"
        caption="Insert the full name of the new Joiner"
        error={errors.name ? "Required" : undefined}
      >
        <Input
          name="name"
          inputRef={register({ required: true })}
          error={errors.name}
        />
      </FormControl>

      <FormControl
        label="Date"
        caption="Where did the new member joined the team?"
        error={errors.date ? "Required" : undefined}
      >
        <Controller
          name="date"
          control={control}
          defaultValue={null}
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <DatePicker
              value={[value]}
              onChange={({ date }) => onChange(date)}
              error={errors.date}
            />
          )}
        />
      </FormControl>

      <FormControl
        label="About Me"
        caption="Write something nice about this new person that is going to join the team"
        error={
          errors.aboutMe ? "Please write at least 150 characteres" : undefined
        }
      >
        <Controller
          name="aboutMe"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              error={errors.aboutMe}
            />
          )}
        />
      </FormControl>

      <FormControl
        label="To Remember Me"
        caption="Write something nice about this new person that is going to join the team"
        error={
          errors.toRememberMe
            ? "Please write at least 150 characteres"
            : undefined
        }
      >
        <Controller
          name="toRememberMe"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              error={errors.toRememberMe}
            />
          )}
        />
      </FormControl>

      <FormControl
        label="Where am I now?"
        caption="Write something nice about this new person that is going to join the team"
        error={
          errors.whereIAm ? "Please write at least 150 characteres" : undefined
        }
      >
        <Controller
          name="whereIAm"
          control={control}
          defaultValue={""}
          rules={{ required: true }}
          render={({ onChange, value }) => (
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              error={errors.whereIAm}
            />
          )}
        />
      </FormControl>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button type="reset" kind="tertiary" onClick={() => reset()}>
            Clear
          </Button>
        </div>
        <div style={{ display: "flex", gap: "0.5em" }}>
          <Button
            type="button"
            onClick={() => onPreview(getValues())}
            kind="secondary"
          >
            Preview
          </Button>
          <Button type="submit">Generate</Button>
        </div>
      </div>
    </form>
  );
}
