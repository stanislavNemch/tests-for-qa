import css from "./ContactCard.module.css";

interface ContactCardProps {
    name: string;
    role: string;
    email: string;
    linkedin: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ name, role, email, linkedin }) => {
    return (
        <div className={css.card}>
            <h3 className={css.name}>{name}</h3>
            <p className={css.role}>{role}</p>
            <p className={css.contactInfo}>Email: <a href={`mailto:${email}`}>{email}</a></p>
            <p className={css.contactInfo}>LinkedIn: <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>
        </div>
    );
};

export default ContactCard;
