# So, there are a few steps to get this up and running. Tkinter for front-end for now. SQLite for storage
# MiniLM for local LM and Gmail API. 
# We move step by step. 


# Step 1. - Create a config file for the user. 
# Step 2 - Fetch gmails : 

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

def main():
    
    creds = None
    
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open("token.json", "w") as token:
        token.write(creds.to_json())
    
    try:
    # Call the Gmail API

        # My comments : Okay, we are building a service, and getting the results. 
        service = build("gmail", "v1", credentials=creds)
        results = service.users().labels().list(userId="me").execute()
        labels = results.get("labels", [])
        print(results)
        if not labels:
            print("No labels found.")
            return
        print("Labels:")
        
        for label in labels:
            print(label["name"])

    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")


if __name__ == "__main__":
    main()

