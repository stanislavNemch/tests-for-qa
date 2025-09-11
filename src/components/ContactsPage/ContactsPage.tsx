import { useState, useEffect } from "react";
import ContactCard from "../ContactCard/ContactCard";
import css from "./ContactsPage.module.css";

const developers = [
    {
        picture: "/img/developer/developer_1.webp",
        name: "Developer 1",
        role: "Frontend Developer",
        info: "Some additional information about Developer 1",
    },
    {
        picture: "/img/developer/developer_2.webp",
        name: "Developer 2",
        role: "Backend Developer",
        info: "Some additional information about Developer 2",
    },
    {
        picture: "/img/developer/developer_3.webp",
        name: "Developer 3",
        role: "Fullstack Developer",
        info: "Some additional information about Developer 3",
    },
    {
        picture: "/img/developer/developer_4.webp",
        name: "Developer 4",
        role: "QA Engineer",
        info: "Some additional information about Developer 4",
    },
    {
        picture: "/img/developer/developer_5.webp",
        name: "Developer 5",
        role: "DevOps Engineer",
        info: "Some additional information about Developer 5",
    },
    {
        picture: "/img/developer/developer_6.webp",
        name: "Developer 6",
        role: "UI/UX Designer",
        info: "Some additional information about Developer 6",
    },
    {
        picture: "/img/developer/developer_1.webp",
        name: "Developer 7",
        role: "Project Manager",
        info: "Some additional information about Developer 7",
    },
    {
        picture: "/img/developer/developer_2.webp",
        name: "Developer 8",
        role: "Business Analyst",
        info: "Some additional information about Developer 8",
    },
];

function useScreenType() {
    const [type, setType] = useState("mobile");
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1280) setType("desktop");
            else if (window.innerWidth >= 768) setType("tablet");
            else setType("mobile");
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return type;
}

const MOBILE_LIMIT = 3;

const ContactsPage = () => {
    const screenType = useScreenType();
    const [visibleCount, setVisibleCount] = useState(MOBILE_LIMIT);

    const cardsToShow =
        screenType === "mobile"
            ? developers.slice(0, visibleCount)
            : developers;

    return (
        <div className={css.contactsContainer}>
            <h2 className={css.title}>Our Team</h2>
            <div className={css.divider}></div>
            <div
                className={
                    screenType === "mobile"
                        ? css.cardListMobile
                        : screenType === "tablet"
                        ? css.cardListTablet
                        : css.cardListDesktop
                }
            >
                {cardsToShow.map((dev, index) => (
                    <ContactCard key={index} {...dev} />
                ))}
            </div>
            {screenType === "mobile" && visibleCount < developers.length && (
                <button
                    className={css.loadMoreBtn}
                    onClick={() => setVisibleCount((c) => c + 1)}
                >
                    Load more
                </button>
            )}
        </div>
    );
};

export default ContactsPage;
