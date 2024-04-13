import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import HashLoader from 'react-spinners/HashLoader';

const Contact = () => {

  const form = useRef();
  const [loading,setLoading] =useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true)
    emailjs
      .sendForm('service_05gcj4b', 'template_lwexrql', form.current, {
        publicKey: 'ArfZn3wvukqL798bb',
      })
      .then(
        () => {
          setLoading(false);
          toast.success('Mail sent successfully');
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        },
      );
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              Your Email
            </label>
            <input type="email" name="user_email" id="email" placeholder="example@gmail.com" className="form__input mt-1" required/>
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              Subject
            </label>
            <input type="text" id="subject" name="subject" placeholder="Let us know how we can help you" className="form__input mt-1" required/>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea rows="6" type="text" name="message" id="message" placeholder="Leave a comment...." className="form__input mt-1" required/>
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            {loading ? <HashLoader size={25} color='#ffffff' /> :'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact