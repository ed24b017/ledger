# So, there are a few steps to get this up and running. Tkinter for front-end for now. SQLite for storage
# MiniLM for local LM and Gmail API. 
# We move step by step. 


# Step 1. - Create a config file for the user. 
# Step 2 - Fetch gmails : 

import os.path
from bs4 import BeautifulSoup
import re
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

def html_to_text(html_content):
    """Convert HTML email to clean plain text using BeautifulSoup"""
    if not html_content:
        return ""
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Remove script, style, and link elements
    for element in soup(["script", "style", "a"]):
        element.decompose()
    
    # Get text
    text = soup.get_text(separator='\n')
    
    # Remove URLs in various formats
    text = re.sub(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    text = re.sub(r'www\.(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', '', text)
    
    # Remove content in brackets that looks like URLs or email addresses
    text = re.sub(r'\[.*?@.*?\]', '', text)  # Email addresses in brackets
    text = re.sub(r'\[http.*?\]', '', text)  # URLs in brackets
    text = re.sub(r'\[www\..*?\]', '', text)  # www links in brackets
    
    # Clean up whitespace
    lines = (line.strip() for line in text.splitlines())
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    text = '\n'.join(chunk for chunk in chunks if chunk)
    
    return text

def get_message(service, msg_id):
    msg = service.users().messages().get(
        userId="me",
        id=msg_id,
        format="full"  
    ).execute()

    return msg


def decode_base64(data):
    return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")


def extract_complete_body(payload):
    plain = []
    html = []

    def walk(part):
        mime = part.get("mimeType", "")
        body = part.get("body", {})

        # Debug: print what we're seeing

        if body.get("data"):
            if mime == "text/plain":
                decoded = decode_base64(body["data"])
                plain.append(decoded)
            elif mime == "text/html":
                decoded = decode_base64(body["data"])
                html.append(decoded)
                
        for sub in part.get("parts", []):
            walk(sub)

    walk(payload)

    result = "\n".join(plain) if plain else "\n".join(html)
    return result


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
        service = build("gmail", "v1", credentials=creds)
        results = service.users().messages().list(userId="me", maxResults=10).execute()
        messages = results.get("messages", [])
        
        if not messages:
            print("No messages found.")
            return

        for m in messages:
            msg = get_message(service, m["id"])
            headers = msg["payload"]["headers"]
            
            subject = next(h["value"] for h in headers if h["name"] == "Subject")
            sender = next(h["value"] for h in headers if h["name"] == "From")
            
            body = extract_complete_body(msg["payload"])
            body = html_to_text(body)  # Convert HTML to clean text
            
            print("FROM:", sender)
            print("SUBJECT:", subject)
            print("BODY:", body)
            print("-" * 40)

    except HttpError as error:
        print(f"An error occurred: {error}")


if __name__ == "__main__":
    main()

