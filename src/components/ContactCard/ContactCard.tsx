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
        <div className={css.card} tabIndex={0}>
            <div className={css.picture}>
                <img
                    src={picture}
                    alt={`${name}'s picture`}
                    className={css.pictureInner}
                    loading="lazy"
                />
            </div>
            <h3 className={css.name}>{name}</h3>
            <p className={css.role}>{role}</p>
            <p className={css.contactInfo}>{info}</p>
        </div>
    );
};

export default ContactCard;
