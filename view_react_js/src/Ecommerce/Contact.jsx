import React, { useRef } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";
import Cart from "./Cart";
export default function Contact() {
  const notify = () => {
    toast("🙌 Gửi mail thành công !");
  };
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_hjh5vcs",
        "template_hswai0d",
        form.current,
        "ycP8Y5zNnEpvxBDBf"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <>
      <Header />
      <div class="container m-5">
        <div class="form">
          <div class="contact-info">
            <h3 class="title">Let's get in touch</h3>
            <p class="text">
              {" "}
              Contact us with the following details. and fillup the form with
              the details.{" "}
            </p>
            <div class="info">
              <div class="social-information">
                {" "}
                <i class="fa fa-map-marker"></i>
                <p>Da Nang</p>
              </div>
              <div class="social-information">
                {" "}
                <i class="fa fa-envelope-o"></i>
                <p>contact@hieunv65.com</p>
              </div>
              <div class="social-information">
                {" "}
                <i class="fa fa-mobile-phone"></i>
                <p>+1 989 989 9898 </p>
              </div>
            </div>
            <div class="social-media">
              <p>Connect with us :</p>
              <div class="social-icons">
                <i class="fab fa-facebook-square"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
                <i class="fab fa-linkedin"></i>
              </div>
            </div>
          </div>
          <div class="contact-info-form">
            {" "}
            <span class="circle one"></span> <span class="circle two"></span>
            <form ref={form} onSubmit={sendEmail}>
              <h3 class="title">Contact us</h3>
              <div class="social-input-containers">
                {" "}
                <input
                  type="text"
                  name="name"
                  class="input"
                  placeholder="Name"
                />{" "}
              </div>
              <div class="social-input-containers">
                {" "}
                <input
                  type="email"
                  name="email"
                  class="input"
                  placeholder="Email"
                />{" "}
              </div>
              <div class="social-input-containers">
                {" "}
                <input
                  type="tel"
                  name="phone"
                  class="input"
                  placeholder="Phone"
                />{" "}
              </div>
              <div class="social-input-containers textarea">
                {" "}
                <textarea
                  name="message"
                  class="input"
                  placeholder="Message"
                ></textarea>{" "}
              </div>{" "}
              <button className="btn btn-warning" onClick={notify}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Cart />
    </>
  );
}
