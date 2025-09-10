import ContactCard from "../ContactCard/ContactCard";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
    const developers = [
        {
            picture: "https://via.placeholder.com/150",
            name: "Developer 1",
            role: "Frontend Developer",
            info: "Some additional information about Developer 1",
        },
        {
            picture: "https://via.placeholder.com/150",
            name: "Developer 2",
            role: "Backend Developer",
            info: "Some additional information about Developer 2",
        },
    ];

    return (
        <div className={css.contactsContainer}>
            <h2 className={css.title}>Our Team</h2>
            <div className={css.cardList}>
                {developers.map((dev, index) => (
                    <ContactCard key={index} {...dev} />
                ))}
            </div>
        </div>
    );
};

export default ContactsPage;
