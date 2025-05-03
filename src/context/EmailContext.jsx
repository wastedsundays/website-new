import { createContext, useState } from "react";

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [emailSent, setEmailSent] = useState(false);

    return (
        <EmailContext.Provider value={{ emailSent, setEmailSent }}>
            {children}
        </EmailContext.Provider>
    );
};

export default EmailContext;