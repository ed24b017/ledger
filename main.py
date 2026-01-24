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
import base64

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]





def get_message(service, msg_id):
    msg = service.users().messages().get(
        userId="me",
        id=msg_id,
        format="full"  
    ).execute()

    return msg


def decode_base64(data):
    return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")


def extract_body(message):
    payload = message["payload"]

    if "parts" in payload:
        for part in payload["parts"]:
            if part["mimeType"] == "text/plain":
                return decode_base64(part["body"]["data"])
    else:
        return decode_base64(payload["body"]["data"])

    return ""


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
        results = service.users().messages().list(userId="me", maxResults=5).execute()
        messages = results.get("messages", [])
        if not messages:
            print("No messages found.")
            return

        for m in messages:
            
            msg = get_message(service, m["id"])

            headers = msg["payload"]["headers"]
            
            subject = next(h["value"] for h in headers if h["name"] == "Subject")
            sender = next(h["value"] for h in headers if h["name"] == "From")

            body = extract_body(msg)

            print("FROM:", sender)
            print("SUBJECT:", subject)
            print("BODY:", body[:500])
            print("-" * 40)    


    except HttpError as error:
        # TODO(developer) - Handle errors from gmail API.
        print(f"An error occurred: {error}")



if __name__ == "__main__":
    main()

