import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      setError('');
      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/forgotPassword',
          { email: values.email }
        );
        setMessage(<> Password reset link has been sent to your email!
        <br />
            Or reset directly here:{' '}
            <Link
              to={`/reset-password?email=${values.email}`}
              className='text-green-600 underline'>
              Reset Password
            </Link>
          </>
          );
      } catch (err) {
        setError('Failed to send the password reset link.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='max-w-md mx-auto pt-24 pb-24'>
      <h2 className='text-4xl text-green-600 font-bold text-center mb-4'>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='mb-4'>
          <input
            type='email'
            name='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className='w-full p-3 border border-gray-300 rounded-md'
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-600 text-sm'>{formik.errors.email}</div>
          )}
        </div>
        <button
          type='submit'
          className={`p-3 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-green-600'}`}
          disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {message && <div className='mt-4 text-green-600'>{message}</div>}
        {error && <div className='mt-4 text-red-600'>{error}</div>}
      </form>
    </div>
  );
}
