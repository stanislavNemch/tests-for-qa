import css from "./ContactCard.module.css";

interface ContactCardProps {
    name: string;
    role: string;
    info: string;
    picture: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
    name,
    role,
    info,
    picture,
}) => {
    return (
        <div className={css.card}>
            <img
                src={picture}
                alt={`${name}'s picture`}
                className={css.picture}
            />
            <h3 className={css.name}>{name}</h3>
            <p className={css.role}>{role}</p>
            <p className={css.contactInfo}>{info}</p>
        </div>
    );
};

export default ContactCard;
