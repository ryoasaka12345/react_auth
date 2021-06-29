import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Profile.module.css";

const Profile = () => {
    return (
        <Card className={classes.profile}>
            <h1>User Profile</h1>
            <div>
                <p>Name: My Name</p>
                <p>Email: My Email</p>
            </div>
        </Card>
    );
};

export default Profile;
