import Link from "next/link";

export default function Cta() {
    return (
        <>
            <div className="cta-section-02 padding-bottom-140">
                <div className="container">
                    <div className="cta-section-02__wrapper">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="cta-content-02">
                                    <div className="cta-content-02__text-block">
                                        <span className="subtitle">
                                            Get a consultation with our skilled
                                            designer
                                        </span>
                                        <h2 className="cta-content-02__title heading-md text-black">
                                            Let&apos;s make something great
                                            together
                                        </h2>
                                    </div>
                                    <div className="cta-content-02__button">
                                        <Link
                                            href="/contact"
                                            className="btn btn-black hvr-black-white"
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
            </div>
        </>
    );
}
