import Link from "next/link";

export default function Cta() {
    return (
        <div className="cta-section bg-sand padding-top-100 padding-bottom-140">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="cta-content">
                            <div className="cta-content__text-block">
                                <span className="subtitle">
                                    Get a consultation with our skilled designer
                                </span>
                                <h2 className="cta-content__title heading-xxl text-black">
                                    Let&apos;s make something great together
                                </h2>
                            </div>
                            <div className="cta-content__button">
                                <Link
                                    href="/contact"
                                    className="btn btn-primary hvr-fill-black"
                                >
                                    Build a project with us
                                    <i className="fa-solid fa-arrow-right icon-arrow-corner" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
