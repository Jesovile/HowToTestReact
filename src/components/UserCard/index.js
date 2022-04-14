import React, {useEffect, useState} from 'react';
import "./UserCard.css";
import {getUser} from "../../api/user";

const UserCard = ({ userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser(userId).then((userResponse) => setUser(userResponse));
    }, []);

    // render
    if (user) {
        return (
            <section className="UserCard">
                <h2 className="UserCard_formHeader">User Card</h2>
                <div className="UserCard_formRow">
                    <label>Name:</label>
                    <div>{user.name}</div>
                </div>
                <div className="UserCard_formRow">
                    <label>Position:</label>
                    <div>{user.position}</div>
                </div>
            </section>
        );
    } else {
        return (
            <section className="UserCard">
                <h2 className="UserCard_formHeader">Loading...</h2>
            </section>
        );
    }

}

export default UserCard;
