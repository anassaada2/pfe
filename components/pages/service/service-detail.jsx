import Image from "next/image";

export default function ServiceDetail() {
    return (
        <div className="service-details_main-section section-padding-140 single-page-content">
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-12">
                        <div className="service-details_main-image">
                            <Image
                                height={606}
                                width={1116}
                                src="/image/service/service-1.png"
                                alt="service image"
                                className="w-100 h-auto"
                            />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <h3>About the Service</h3>
                        <p>
                            Risus rhoncus, vel erat rhoncus, consequat ut
                            aliquet. Tortor semper sed proin augue laoreet
                            placerat. Vestibulum sit fames arcu ut justo
                            accumsan eget. Rhoncus dictumst magna ornare
                            eleifend egestas in faucibus nascetur arcu. Nulla
                            maecenas massa lectus tortor urna ipsum diam
                            ultrices commodo. Metus eget nulla sit consectetur
                            egestas velit. Eu, morbi suspendisse massa nec,
                            neque ac dui. Vel, tortor mattis ut ornare elit
                        </p>
                        <p>
                            At Konstruktion, we are passionate about driving
                            value into every project we undertake. We continue
                            to challenge our people, projects and the industry.
                            By being forward-thinking , we are continually
                            finding new ways to deliver success for our clients
                            and stakeholders.
                        </p>
                    </div>
                    <div className="col-lg-12">
                        <div className="row service-details_main-image-row">
                            <div className="col-6">
                                <Image
                                    height={170}
                                    width={170}
                                    src="/image/service/service-2.png"
                                    alt="service image"
                                    className="w-100 h-auto"
                                />
                            </div>
                            <div className="col-6">
                                <Image
                                    height={170}
                                    width={170}
                                    src="/image/service/service-3.png"
                                    alt="service image"
                                    className="w-100 h-auto"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <span>
                            Risus rhoncus, vel erat rhoncus, consequat ut
                            aliquet. Tortor semper sed proin augue placerat.
                            Vestibulum sit fames arcu ut justo accumsan eget.
                            Rhoncus dictumst magna ornare egestas in faucibus
                            nascetur arcu. Nulla maecenas massa lectus
                        </span>
                        <h3>What&apos;s Included in This Service?</h3>
                        <p>
                            Senectus natoque duis consequat varius pulvinar
                            eleifend. Diam ullamcorper sit commodo tempor id
                            tempor massa. Nibh fringilla dictum duis sed odio.
                            Faucibus vitae leo vitae mauris enim velit id at.
                            Penatibus nibh adipiscing dui sit. Vestibulum
                            gravida nisl nisl egestas gravida euismod. Tempor
                            urna facilisis turpis senectus. Nullam aliquet eros,
                            proin in. In cursus
                        </p>
                        <ul className="list-style-bullet">
                            <li>
                                Neque sodales ut etiam sit amet nisl purus non
                                tellus orci
                            </li>
                            <li>
                                Adipiscing elit ut aliquam purus sit amet
                                viverra potenti
                            </li>
                            <li>
                                Adipiscing elit ut aliquam purus sit viverra
                                suspendisse potenti
                            </li>
                            <li>Mauris commodo quis imperdiet massa</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
