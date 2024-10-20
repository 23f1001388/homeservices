from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from jinja2 import Template
from flask import request,jsonify
# from flask import current_app as app

SMTP_SERVER = "localhost"
SMTP_PORT = 1025
SENDER_EMAIL = "tlsetiastudy@gmail.com"
SENDER_PASSWORD = 'Shiv*2231'

def send_email(to, subject, content_body):
    msg = MIMEMultipart()
    msg["To"] = to
    msg["Subject"] = subject
    msg["From"] = SENDER_EMAIL
    msg.attach(MIMEText(content_body, 'html'))
    client = smtplib.SMTP(host=SMTP_SERVER, port=SMTP_PORT)
    try:
        client.send_message(msg=msg)
        print(f"Email sent to: {to}")
    except Exception as e:
        print(f"Error Sending Mail: {e}")
        raise
    finally:
        client.quit()



# send_email('tlsetia@gmail.com', 'Mail Subject Testing', '<h1> Test 01 </h1>')