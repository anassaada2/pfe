export default function ContactForm() {
  return (
    <div className="contact-form-box">
      <h3 className="contact-form__title">CONTACTEZ NOUS</h3>
      <form action="/">
        <div className="row gutter-y-default justify-content-center">
          <div className="col-lg-6">
            <input
              type="text"
              placeholder="Full Name"
              className="form-control"
            />
          </div>
          <div className="col-lg-6">
            <input
              type="text"
              placeholder="Phone Number"
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <textarea
              name="message"
              placeholder="Write Your Message"
              className="form-control"
              defaultValue={""}
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary hvr-fill-black">
              Envoyez
              <i className="fa-solid fa-arrow-right icon-arrow-corner" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
