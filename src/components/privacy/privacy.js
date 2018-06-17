import React from 'react';

export const Privacy = (props) => {
    return (
        <div className="container">
            <div className="row">
                <p className="h3">Your data is not stored by this Website.</p>
                
                <p className="lead">
                    Once you sign-in, you grant the rights for this application to create a Spreadsheet that is hosted into your own Google Drive account.
                </p>
                <p>
                    <small className="text-muted">
                        You can revoke access to this Website anytime  from your Google Account <a href="https://myaccount.google.com/security#connectedapps" target="_blank" rel="noopener noreferrer">page</a>. 
                    </small>
                </p>
            </div>
        </div>

    )
}