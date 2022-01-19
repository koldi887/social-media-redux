import React from 'react'
import { useForm } from 'react-hook-form'
import classes from './Register.module.css'

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div className={classes.formContainer}>
      <form
        className={classes.registrationForm}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <label htmlFor="firstName">First Name:</label>
        <input
          {...register('firstName', {
            required: 'This is required',
            maxLength: { value: 5, message: 'You exceeded the maximum length' },
          })}
          id="firstName"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}

        <label htmlFor="lastName">Last Name:</label>
        <input {...register('lastName')} id="lastName" />

        <label htmlFor="age">Age:</label>
        <input
          {...register('age', {
            required: 'This is required',
            maxLength: {
              value: 4,
              message: 'You exceeded the maximum length',
            },
          })}
          id="age"
        />
        {errors.age && <p>{errors.age.message}</p>}

        <label htmlFor="gender">Choose gender: </label>
        <select {...register('gender')} id="gender">
          <option value="">Select...</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>

        <label htmlFor="developer">Are you developer?</label>
        <input {...register('developer')} type="checkbox" value="yes" />

        <input type="submit" />
      </form>
    </div>
  )
}
