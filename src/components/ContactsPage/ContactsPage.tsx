import ContactCard from "../ContactCard/ContactCard";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
    const developers = [
        {
            name: "Developer 1",
            role: "Frontend Developer",
            email: "dev1@example.com",
            linkedin: "https://www.linkedin.com/in/dev1",
        },
        {
            name: "Developer 2",
            role: "Backend Developer",
            email: "dev2@example.com",
            linkedin: "https://www.linkedin.com/in/dev2",
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
